import { Injectable } from '@nestjs/common';
import * as crypto from 'crypto';

@Injectable()
export class ExternalUsageService {
  /**
   * Mock endpoint to simulate fetching usage data from external systems
   * - Generates a deterministic usage number based on input parameters
   * - Includes a random delay between 1-3 seconds to simulate network latency
   */
  async getUsageFromExternal(params: {
    accountId: string;
    productId: string;
    planId: string;
    startDate: Date;
    endDate: Date;
  }): Promise<number> {
    // Simulate random delay between 1 and 3 seconds
    const delayMs = Math.floor(Math.random() * 400) + 100; // 100-500ms
    await this.delay(delayMs);

    const { accountId, productId, planId, startDate, endDate } = params;
    const input = `${productId}${planId}${accountId}${startDate.valueOf()}${endDate.valueOf()}`;
    const hash = crypto.createHash('sha256').update(input).digest('hex');

    // Convert first 8 characters of hash to a number between 0 and 1000
    const numericHash = parseInt(hash.substring(0, 8), 16);
    return numericHash % 1000;
  }

  /**
   * Helper method to introduce delay
   */
  private delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
