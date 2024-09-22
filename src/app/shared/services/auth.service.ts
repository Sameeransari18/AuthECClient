import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:5208/api'; // Base API url

  // Post Method for User
  CreateUser(formData: any) {
    return this.http.post(this.baseUrl + '/signup', formData);
  }
}
