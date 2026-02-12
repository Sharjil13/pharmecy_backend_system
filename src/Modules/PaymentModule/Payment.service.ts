import { BadRequestException, Injectable } from '@nestjs/common';
import { StripeService } from './Stripe.service';
import { weebhookQueueService } from '../Queue/Webhook.queue';

@Injectable()
export class PaymentService {
  constructor(
    private readonly stripeService: StripeService,
    private readonly queueService: weebhookQueueService,
  ) {}

  async createPayment(amount: number, currency: string) {
    const paymentIntent = await this.stripeService.createPaymentIntent({
      amount,
      currency,
    });
    return paymentIntent.client_secret;
  }
  async handleWebhook(signature: string, payload: Buffer) {
    try {
      const event = this.stripeService.verifyWebhookSignature(
        payload,
        signature,
      );

      await this.queueService.addWebhookJob(event);

      return { received: true };
    } catch (error) {
      console.error('⚠️ Failed to handle Stripe webhook:', error.message);
      throw new BadRequestException('Invalid Stripe webhook');
    }
  }
}
