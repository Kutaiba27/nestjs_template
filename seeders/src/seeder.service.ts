import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account, AccountDocument } from './schemas/account.shcema';
import { account } from './data';

@Injectable()
export class SeederService {
  private readonly logger = new Logger(SeederService.name);

  constructor(
    @InjectModel(Account.name) private readonly accountModel: Model<AccountDocument>,
  ) {}


  async seed() {
    try {
      this.logger.log('Starting database seeding...');

      // await this.clearDatabase();

      // Seed users
      await this.accountSeed();
      this.logger.log('Database seeding completed successfully');
    } catch (error) {
      this.logger.error('Error seeding database:', error.message);
      // throw error;
    }
  }

  private async clearDatabase() {
    this.logger.log('Clearing existing data...');
    await this.accountModel.deleteMany({});
    this.logger.log('Database cleared');
  }

  private async accountSeed() {
    this.logger.log('Seeding users...');
    const accounts = Object.keys(account);
    await Promise.all(accounts.map(async (accountKey) => {
      const accountData = account[accountKey];
      await this.accountModel.updateOne({ id: accountData.id }, { $set: accountData }, { upsert: true });
    }));
    this.logger.log('accounts seeded successfully');
  }

} 