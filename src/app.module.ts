import { HttpModule } from '@nestjs/axios';
import { Module, CacheModule } from '@nestjs/common';
import { RedisClientOptions } from 'redis';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import * as redisStore from "cache-manager-redis-store";


@Module({
  imports: [CacheModule.register<RedisClientOptions>(
  //   {
  //   isGlobal: true,
  //   store: redisStore,
  //   url: "redis://localhost:6379",
  // }
  ), HttpModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
