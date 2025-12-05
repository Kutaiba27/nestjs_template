import {Module, Global} from '@nestjs/common';
import { RedisService } from './redis.service';
import { ICacheService } from '../cach.service';

@Global()
@Module({
  providers: [
    {
      provide: ICacheService,
      useClass: RedisService,
    },
  ],
  exports: [ICacheService],
})
export class CashModule {}
