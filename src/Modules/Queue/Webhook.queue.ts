import { Injectable } from '@nestjs/common';
import { Queue } from 'bullmq';
import { RedisOptions } from 'ioredis';

@Injectable()
export class weebhookQueueService {
  private queue: Queue;
  constructor() {
    const connection: RedisOptions = {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379'),
    };

    this.queue = new Queue('stripe-webhook-queue', {
      connection,
    });
  }

  async addWebhookJob(event: any) {
    await this.queue.add('process-payment', event, {
      attempts: 5,
      backoff: {
        type: 'exponential',
        delay: 3000,
      },
      removeOnComplete: true,
      removeOnFail: false,
    });
  }
}
