import { Injectable } from '@angular/core';
import { ApiService } from '../../services/api.service';

@Injectable()
export class HomeService {
  constructor(private api: ApiService) {
    console.log('Hello World');
    // api.get('/helloWorld').then(data => console.log(data))
  }
}
