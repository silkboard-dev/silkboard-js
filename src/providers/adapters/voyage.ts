import type { ModelConfig, RerankResult } from '../../types';

let voyageClient: VoyageAIClient | null = null;

interface VoyageAIClient {
  embed(options: {
    input: string[];
    model: string;
    inputType?: 'document' | 'query';
    truncation?: boolean;
  }): Promise<{ data: Array<{ embedding: number[] }> }>;
  
  rerank(options: {
    query: string;
    documents: string[];
    model: string;
    topK?: number;
    truncation?: boolean;
  }): Promise<{
    data: Array<{ index: number; relevanceScore: number }> | null;
  }>;
}

function getVoyageClient(): VoyageAIClient {
  if (!voyageClient) {
    const apiKey = process.env.VOYAGE_API_KEY;
    if (!apiKey) {
      throw new Error('VOYAGE_API_KEY not configured');
    }

    // Dynamic import to avoid loading if not needed
    const { VoyageAIClient: Client } = require('voyageai');
    voyageClient = new Client({ apiKey });
  }
  return voyageClient!;
}

export async function voyageEmbed(
  texts: string | string[],
  config: ModelConfig
): Promise<number[][]> {
  const client = getVoyageClient();
  const input = Array.isArray(texts) ? texts : [texts];

  const response = await client.embed({
    input,
    model: config.model_id,
    inputType: config.parameters?.input_type,
    truncation: true,
  });

  return response.data.map((d) => d.embedding);
}

export async function voyageRerank(
  query: string,
  documents: string[],
  config: ModelConfig,
  topN?: number
): Promise<RerankResult[]> {
  const client = getVoyageClient();

  const response = await client.rerank({
    query,
    documents,
    model: config.model_id,
    topK: topN ?? 10,
    truncation: true,
  });

  if (!response.data) {
    return [];
  }

  return response.data
    .filter((r): r is { index: number; relevanceScore: number } => 
      r.index !== undefined && r.relevanceScore !== undefined
    )
    .map((r) => ({
      index: r.index,
      relevanceScore: r.relevanceScore,
      document: documents[r.index],
    }));
}

export function isVoyageAvailable(): boolean {
  return !!process.env.VOYAGE_API_KEY;
}

export function clearVoyageClient(): void {
  voyageClient = null;
}
