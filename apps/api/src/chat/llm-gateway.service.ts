import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export interface ChatTurn {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// One small interface, provider chosen by env var — same pattern proven
// out in the dental-clinic project's aiProvider.js, kept intentionally
// simpler here since the MVP only needs one active provider at a time.
// `mock` is the default so the whole app runs with zero external keys.
@Injectable()
export class LlmGatewayService {
  constructor(private config: ConfigService) {}

  async generateReply(turns: ChatTurn[]): Promise<string> {
    const provider = this.config.get<string>('LLM_PROVIDER') ?? 'mock';
    if (provider === 'openai') {
      return this.openai(turns);
    }
    return this.mock(turns);
  }

  private async mock(turns: ChatTurn[]): Promise<string> {
    const lastUser = [...turns].reverse().find((t) => t.role === 'user');
    const text = lastUser?.content?.trim() || '';
    return `(پاسخ آزمایشی - بدون کلید API واقعی)\nپیام شما را دریافت کردم: "${text}".\nبرای پاسخ واقعی هوش مصنوعی، LLM_PROVIDER=openai را در .env تنظیم کنید و OPENAI_API_KEY را وارد کنید.`;
  }

  private async openai(turns: ChatTurn[]): Promise<string> {
    const apiKey = this.config.get<string>('OPENAI_API_KEY');
    const baseUrl = this.config.get<string>('OPENAI_BASE_URL') ?? 'https://api.openai.com/v1';
    const model = this.config.get<string>('OPENAI_MODEL') ?? 'gpt-4o-mini';
    if (!apiKey) {
      return this.mock(turns);
    }
    const response = await fetch(`${baseUrl}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model,
        messages: turns.map((t) => ({ role: t.role, content: t.content })),
      }),
    });
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`LLM provider error (${response.status}): ${body}`);
    }
    const data = await response.json();
    return data?.choices?.[0]?.message?.content ?? '';
  }
}
