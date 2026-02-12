import { Module } from '@nestjs/common';
import { PaymentController } from './Payment.controller';
import { PaymentService } from './Payment.service';
import { StripeService } from './Stripe.service';
import { QueueModule } from '../Queue/Queue.module';

@Module({
  imports: [QueueModule],
  controllers: [PaymentController],
  providers: [PaymentService, StripeService],
  exports: [PaymentService],
})
export class PaymentModule {}
