import { rerank } from 'ai';
import type { ModelConfig, RerankResult } from '../../types';

let cohereProvider: any | null = null;

async function getCohereProvider() {
  if (!cohereProvider) {
    const apiKey = process.env.COHERE_API_KEY;
    if (!apiKey) {
      throw new Error('COHERE_API_KEY not configured');
    }
    const { createCohere } = await import('@ai-sdk/cohere');
    cohereProvider = createCohere({ apiKey });
  }
  return cohereProvider;
}

export async function cohereRerank(
  query: string,
  documents: string[],
  config: ModelConfig,
  topN?: number
): Promise<RerankResult[]> {
  const provider = await getCohereProvider();

  const { ranking } = await rerank({
    model: provider.reranking(config.model_id),
    documents,
    query,
    topN: topN ?? Math.min(10, documents.length),
  });

  return ranking.map((r) => ({
    index: r.originalIndex,
    relevanceScore: r.score,
    document: documents[r.originalIndex],
  }));
}

export function isCohereAvailable(): boolean {
  return !!process.env.COHERE_API_KEY;
}

export function clearCohereProvider(): void {
  cohereProvider = null;
}
