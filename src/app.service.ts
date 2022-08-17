import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';



@Injectable()
export class AppService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) { }

  async getHello(): Promise<string> {
    // return 'Hello World!';
    // await this.cacheManager.set('key', 'value', {ttl:0});

    const value: string = await this.cacheManager.get('key')
    return value
  }
}
