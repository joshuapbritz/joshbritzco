import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ApiService {
  private baseUrl: URL = new URL(environment.api);

  constructor(private http: HttpClient) {}

  public get<T = any>(...paths: string[]): Observable<T> {
    return this.http.get<T>(this.constructUrl(paths));
  }

  private constructUrl(paths: string[]): string {
    const mappedpaths = paths.map(path => path.replace('/', '').trim());
    return `${this.baseUrl.href}${mappedpaths.join('')}`;
  }
}
