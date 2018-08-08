import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class ApiService {
  private baseUrl: string = environment.api;
  constructor(private http: HttpClient) {}

  get(path: string): Promise<any> {
    return this.http.get(this.baseUrl + path).toPromise();
  }
}
