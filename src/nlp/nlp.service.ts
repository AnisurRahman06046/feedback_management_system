import { Injectable, OnModuleInit } from '@nestjs/common';
import { NlpManager } from 'node-nlp';

@Injectable()
export class NlpService implements OnModuleInit {
  private manager: NlpManager;

  constructor() {
    this.manager = new NlpManager({ languages: ['en'] });
  }

  async onModuleInit() {
    await this.trainModel(); // Ensure model is trained when the module initializes
  }

  async trainModel() {
    // Add diverse and more extensive training data
    // Positive Sentiments
    this.manager.addDocument('en', 'I love this!', 'sentiment.positive');
    this.manager.addDocument('en', 'This is fantastic', 'sentiment.positive');
    this.manager.addDocument('en', 'I am very happy', 'sentiment.positive');
    this.manager.addDocument('en', 'Great experience!', 'sentiment.positive');
    this.manager.addDocument(
      'en',
      'Absolutely wonderful!',
      'sentiment.positive',
    );
    this.manager.addDocument('en', 'I enjoyed it a lot', 'sentiment.positive');
    // Positive Sentiments
    this.manager.addDocument(
      'en',
      'I love this service!',
      'sentiment.positive',
    );
    this.manager.addDocument(
      'en',
      'This experience was fantastic!',
      'sentiment.positive',
    );
    this.manager.addDocument(
      'en',
      'I am very satisfied with the outcome.',
      'sentiment.positive',
    );
    this.manager.addDocument(
      'en',
      'Everything went smoothly.',
      'sentiment.positive',
    );
    this.manager.addDocument(
      'en',
      'Truly outstanding work!',
      'sentiment.positive',
    );
    this.manager.addDocument(
      'en',
      'Exceeded my expectations.',
      'sentiment.positive',
    );

    // Negative Sentiments
    this.manager.addDocument(
      'en',
      'This service was terrible.',
      'sentiment.negative',
    );
    this.manager.addDocument(
      'en',
      'I am extremely disappointed.',
      'sentiment.negative',
    );
    this.manager.addDocument(
      'en',
      'The experience was very bad.',
      'sentiment.negative',
    );
    this.manager.addDocument(
      'en',
      'I had a terrible time.',
      'sentiment.negative',
    );
    this.manager.addDocument(
      'en',
      'It was a huge letdown.',
      'sentiment.negative',
    );
    this.manager.addDocument(
      'en',
      'I absolutely hated it.',
      'sentiment.negative',
    );

    // Neutral Sentiments
    this.manager.addDocument(
      'en',
      'It was an average experience.',
      'sentiment.neutral',
    );
    this.manager.addDocument(
      'en',
      'The service was neither good nor bad.',
      'sentiment.neutral',
    );
    this.manager.addDocument(
      'en',
      'It was okay, but nothing special.',
      'sentiment.neutral',
    );
    this.manager.addDocument(
      'en',
      'The experience was just fine.',
      'sentiment.neutral',
    );
    this.manager.addDocument('en', 'It could be better.', 'sentiment.neutral');
    this.manager.addDocument(
      'en',
      'Nothing remarkable about it.',
      'sentiment.neutral',
    );

    // Add Answers
    this.manager.addAnswer('en', 'sentiment.positive', 'positive');
    this.manager.addAnswer('en', 'sentiment.negative', 'negative');
    this.manager.addAnswer('en', 'sentiment.neutral', 'neutral');
    // Negative Sentiments
    this.manager.addDocument('en', 'This is terrible', 'sentiment.negative');
    this.manager.addDocument(
      'en',
      'I am so disappointed',
      'sentiment.negative',
    );
    this.manager.addDocument('en', 'Not good at all', 'sentiment.negative');
    this.manager.addDocument('en', 'Very bad experience', 'sentiment.negative');
    this.manager.addDocument('en', 'I hated it', 'sentiment.negative');
    this.manager.addDocument('en', 'It was awful', 'sentiment.negative');

    // Neutral Sentiments
    this.manager.addDocument('en', 'It is okay', 'sentiment.neutral');
    this.manager.addDocument('en', 'Could be better', 'sentiment.neutral');
    this.manager.addDocument('en', 'Nothing special', 'sentiment.neutral');
    this.manager.addDocument('en', 'It was average', 'sentiment.neutral');
    this.manager.addDocument('en', 'Just fine', 'sentiment.neutral');
    this.manager.addDocument('en', 'Neither good nor bad', 'sentiment.neutral');

    // Add Answers
    this.manager.addAnswer('en', 'sentiment.positive', 'positive');
    this.manager.addAnswer('en', 'sentiment.negative', 'negative');
    this.manager.addAnswer('en', 'sentiment.neutral', 'neutral');

    // Train and save the model
    await this.manager.train();
    await this.manager.save(); // Save the model
  }

  // Analyze sentiment of the given text
  async analyzeSentiment(text: string) {
    const response = await this.manager.process('en', text);
    return response.sentiment;
  }
}
