/**
 * Routing strategies for model selection.
 */

import type {
  RoutingStrategy,
  Deployment,
  DeploymentHealth,
} from '../types/router';

/** Strategy function type */
export type StrategyFunction = (
  deployments: Deployment[],
  health: Map<string, DeploymentHealth>,
  context?: { estimatedCost?: number }
) => Deployment | null;

/**
 * Strategy implementations for model routing.
 */
export class StrategyRouter {
  private roundRobinIndex = 0;

  /**
   * Get the strategy function for a given strategy type.
   */
  getStrategy(strategy: RoutingStrategy): StrategyFunction {
    switch (strategy) {
      case 'simple-shuffle':
        return this.simpleShuffle.bind(this);
      case 'round-robin':
        return this.roundRobin.bind(this);
      case 'lowest-latency':
        return this.lowestLatency.bind(this);
      case 'lowest-cost':
        return this.lowestCost.bind(this);
      case 'least-busy':
        return this.leastBusy.bind(this);
      default:
        throw new Error(`Unknown routing strategy: ${strategy}`);
    }
  }

  /**
   * Simple shuffle - weighted random selection.
   */
  simpleShuffle(
    deployments: Deployment[],
    health: Map<string, DeploymentHealth>
  ): Deployment | null {
    const available = this.filterAvailable(deployments, health);
    if (available.length === 0) return null;

    // Calculate total weight
    const totalWeight = available.reduce((sum, d) => sum + (d.weight ?? 1), 0);
    
    // Random selection based on weight
    let random = Math.random() * totalWeight;
    for (const deployment of available) {
      random -= deployment.weight ?? 1;
      if (random <= 0) {
        return deployment;
      }
    }

    // Fallback to first available
    return available[0];
  }

  /**
   * Round robin - sequential rotation through deployments.
   */
  roundRobin(
    deployments: Deployment[],
    health: Map<string, DeploymentHealth>
  ): Deployment | null {
    const available = this.filterAvailable(deployments, health);
    if (available.length === 0) return null;

    const index = this.roundRobinIndex % available.length;
    this.roundRobinIndex++;
    return available[index];
  }

  /**
   * Lowest latency - route to deployment with lowest average latency.
   */
  lowestLatency(
    deployments: Deployment[],
    health: Map<string, DeploymentHealth>
  ): Deployment | null {
    const available = this.filterAvailable(deployments, health);
    if (available.length === 0) return null;

    // Sort by average latency (unknown latency goes to end)
    const sorted = [...available].sort((a, b) => {
      const aHealth = health.get(a.model);
      const bHealth = health.get(b.model);
      const aLatency = aHealth?.averageLatencyMs ?? Infinity;
      const bLatency = bHealth?.averageLatencyMs ?? Infinity;
      return aLatency - bLatency;
    });

    return sorted[0];
  }

  /**
   * Lowest cost - route to cheapest deployment.
   * Note: Requires cost information to be provided in context.
   * Falls back to simple shuffle if no cost info available.
   */
  lowestCost(
    deployments: Deployment[],
    health: Map<string, DeploymentHealth>,
    _context?: { estimatedCost?: number }
  ): Deployment | null {
    const available = this.filterAvailable(deployments, health);
    if (available.length === 0) return null;

    // For now, just use simple shuffle
    // Cost-based routing requires integration with CostTracker
    // which will be done when integrating with the service
    // TODO: Use _context.estimatedCost with CostTracker to find cheapest
    return this.simpleShuffle(deployments, health);
  }

  /**
   * Least busy - route to deployment with lowest request count.
   * Useful for load balancing across deployments.
   */
  leastBusy(
    deployments: Deployment[],
    health: Map<string, DeploymentHealth>
  ): Deployment | null {
    const available = this.filterAvailable(deployments, health);
    if (available.length === 0) return null;

    // Sort by request count
    const sorted = [...available].sort((a, b) => {
      const aHealth = health.get(a.model);
      const bHealth = health.get(b.model);
      const aCount = aHealth?.requestCount ?? 0;
      const bCount = bHealth?.requestCount ?? 0;
      return aCount - bCount;
    });

    return sorted[0];
  }

  /**
   * Filter deployments to only those that are enabled and healthy.
   */
  private filterAvailable(
    deployments: Deployment[],
    health: Map<string, DeploymentHealth>
  ): Deployment[] {
    return deployments.filter((d) => {
      // Check if deployment is enabled
      if (d.enabled === false) return false;

      // Check if deployment is healthy
      const deploymentHealth = health.get(d.model);
      if (deploymentHealth && !deploymentHealth.healthy) return false;

      return true;
    });
  }

  /**
   * Reset round-robin index (useful for testing).
   */
  resetRoundRobin(): void {
    this.roundRobinIndex = 0;
  }
}
