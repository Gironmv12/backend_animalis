import { Injectable, Logger } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class NotificationsService {
  private readonly logger = new Logger(NotificationsService.name);

  async notify(event: string, payload: any, webhookEnvVar?: string) {
    const url =
      (webhookEnvVar && process.env[webhookEnvVar]) ||
      process.env.N8N_WEBHOOK_URL;
    if (!url) {
      this.logger.warn(`No n8n webhook configured for event ${event}`);
      return;
    }

    try {
      await axios.post(
        url,
        { event, payload },
        {
          headers: {
            'x-n8n-secret': process.env.N8N_WEBHOOK_SECRET ?? '',
            'content-type': 'application/json',
          },
          timeout: 5000,
        }
      );
    } catch (err: any) {
      this.logger.warn(
        `Failed to notify n8n for ${event}: ${err?.message ?? err}`
      );
    }
  }
}
