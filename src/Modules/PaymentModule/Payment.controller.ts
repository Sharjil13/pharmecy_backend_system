import { PaymentService } from './Payment.service';
import { Controller, Post, Headers, Req, Res, Body } from '@nestjs/common';
import type { Request, Response } from 'express';

@Controller('/payment')
export class PaymentController {
  constructor(private readonly paymentService: PaymentService) {}

  @Post('/create')
  async createPayment() {
    const amount = 1000; // Amount in cents
    const currency = 'usd';
    const clientSecret = await this.paymentService.createPayment(
      amount,
      currency,
    );
    return { clientSecret };
  }
  @Post('webhook')
  async webhook(
    @Headers('stripe-signature') signature: string,
    @Req() req: Request,
    @Res() res: Response,
  ) {
    try {
      // ⚠ Convert unknown body to Buffer for Stripe verification
      const payload = Buffer.from(await this.getRawBody(req));

      await this.paymentService.handleWebhook(signature, payload);

      res.status(200).json({ received: true });
    } catch (err: any) {
      console.error('Webhook error:', err);
      res.status(400).json({ error: 'Webhook failed' });
    }
  }

  // Utility to read raw body as Buffer
  private getRawBody(req: Request): Promise<Buffer> {
    return new Promise((resolve, reject) => {
      const chunks: Uint8Array[] = [];
      req.on('data', (chunk) => chunks.push(chunk));
      req.on('end', () => resolve(Buffer.concat(chunks)));
      req.on('error', (err) => reject(err));
    });
  }
}
