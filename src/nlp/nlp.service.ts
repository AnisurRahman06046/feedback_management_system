import { Injectable } from '@nestjs/common';
import * as Sentiment from 'sentiment';
// import { Sentiment } from 'sentiment';

@Injectable()
export class NlpService {
  private sentiment: Sentiment;

  constructor() {
    this.sentiment = new Sentiment();
  }

  analyzeSentiment(text: string): { label: string; score: number } {
    const result = this.sentiment.analyze(text);
    const label =
      result.score > 0 ? 'positive' : result.score < 0 ? 'negative' : 'neutral';
    return { label, score: result.score };
  }
}
