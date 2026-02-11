import { Worker, Job } from 'bullmq';
import { Injectable, OnModuleInit } from '@nestjs/common';
import { RedisOptions } from 'ioredis';

@Injectable()
export class WeebhookProcessor implements OnModuleInit {
  constructor() {}

  onModuleInit() {
    const connection: RedisOptions = {
      host: 'localhost',
      port: 6379,
    };

    const worker = new Worker(
      'stripe-webhook-queue',
      async (job: Job) => {
        const event = job.data;

        if (event.type === 'payment_intent.succeeded') {
          const paymentIntent = event.data.object;
        }
      },
      { connection },
    );

    worker.on('completed', (job) => {
      console.log(`✅ Job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
      console.error(`❌ Job ${job?.id} failed`, err.message);
    });
  }
}
