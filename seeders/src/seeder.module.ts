import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { SeederService } from './seeder.service';
import { MongoConnection } from './database/mongodb/mongo.module';
import { EnvConfigModule } from './config';
import { Account, AccountSchema } from './schemas/account.shcema';

@Module({
  imports: [
    MongoConnection,
    EnvConfigModule,
    MongooseModule.forFeature([
      { name: Account.name, schema: AccountSchema },
    ]),
  ],
  providers: [SeederService],
  exports: [SeederService],
})
export class SeederModule {} 