import { CacheInterceptor, CacheKey, CacheTTL, CACHE_MANAGER, Controller, Get, Inject, Post, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { Cache } from 'cache-manager';
import { map, Observable } from 'rxjs';
import { HttpService, } from '@nestjs/axios';
import { AxiosResponse } from 'axios'


@Controller()
export class AppController {
  constructor(private readonly appService: AppService, @Inject(CACHE_MANAGER) private cacheManager: Cache, private readonly httpService: HttpService) { }

  @Get('value')
  async getHello(): Promise<any> {
    const value: string = await this.cacheManager.get('key')
    return value
  }

  @Post('/value')
  async post() {
    await this.cacheManager.set('key', 'value', { ttl: 10 });
  }



  @UseInterceptors(CacheInterceptor)
  @CacheTTL(10)
  @CacheKey("all-data")
  @Get("fetchdata")
  async findAll(): Promise<Observable<AxiosResponse<any, any>>> {
    let data
    return this.httpService.get('https://jsonplaceholder.typicode.com/todos').pipe(
      map(response => response.data)
    )
  }


  @Get("cachedData")
  async findAllCached() {
    const cachedData = await this.cacheManager.get(
      "all-data"
    );
    if (!cachedData) {
      console.log('no cached data')
      let data = await this.findAll()
      this.cacheManager.set('all-data', data)
      return data
    } else {
      console.log('cached data')
      return cachedData

    }
  }
}