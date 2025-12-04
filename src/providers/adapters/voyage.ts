import type { ModelConfig, RerankResult } from '../../types';

let voyageClient: any = null;

async function getVoyageClient(): Promise<any> {
  if (!voyageClient) {
    const apiKey = process.env.VOYAGE_API_KEY;
    if (!apiKey) {
      throw new Error('VOYAGE_API_KEY not configured');
    }
    const { VoyageAIClient } = await import('voyageai');
    voyageClient = new VoyageAIClient({ apiKey });
  }
  return voyageClient;
}

export async function voyageEmbed(
  texts: string | string[],
  config: ModelConfig
): Promise<number[][]> {
  const client = await getVoyageClient();
  const input = Array.isArray(texts) ? texts : [texts];

  const response = await client.embed({
    input,
    model: config.model_id,
    inputType: config.parameters?.input_type,
    truncation: true,
  });

  return response.data.map((d: { embedding: number[] }) => d.embedding);
}

export async function voyageRerank(
  query: string,
  documents: string[],
  config: ModelConfig,
  topN?: number
): Promise<RerankResult[]> {
  const client = await getVoyageClient();

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

  type RerankResponseItem = { index: number; relevanceScore: number };
  return response.data
    .filter((r: RerankResponseItem): r is RerankResponseItem => 
      r.index !== undefined && r.relevanceScore !== undefined
    )
    .map((r: RerankResponseItem) => ({
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
