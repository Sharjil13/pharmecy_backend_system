import { Module } from '@nestjs/common';
import { weebhookQueueService } from './Webhook.queue';
import { WeebhookProcessor } from './Weebhook.process';

@Module({
  imports: [],
  providers: [weebhookQueueService, WeebhookProcessor],
  exports: [weebhookQueueService],
})
export class QueueModule {}
