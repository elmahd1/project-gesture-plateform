import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  /**
   * Perform a GET request
   * @param endpoint API endpoint
   * @param params Optional query parameters
   * @returns Observable of response
   */
  get<T>(endpoint: string, params?: any): Observable<T> {
    let httpParams = new HttpParams();
    if (params) {
      Object.keys(params).forEach(key => {
        httpParams = httpParams.set(key, params[key]);
      });
    }
    return this.http.get<T>(`${this.apiUrl}/${endpoint}`, { params: httpParams });
  }

  /**
   * Perform a POST request
   * @param endpoint API endpoint
   * @param data Request body
   * @returns Observable of response
   */
  post<T>(endpoint: string, data: any): Observable<T> {
    return this.http.post<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * Perform a PUT request
   * @param endpoint API endpoint
   * @param data Request body
   * @returns Observable of response
   */
  put<T>(endpoint: string, data: any): Observable<T> {
    return this.http.put<T>(`${this.apiUrl}/${endpoint}`, data);
  }

  /**
   * Perform a DELETE request
   * @param endpoint API endpoint
   * @returns Observable of response
   */
  delete<T>(endpoint: string): Observable<T> {
    return this.http.delete<T>(`${this.apiUrl}/${endpoint}`);
  }
}