import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  baseUrl = 'http://localhost:5208/api'; // Base API url

  // Register Method for User
  createUser(formData: any) {
    return this.http.post(this.baseUrl + '/signup', formData);
  }

  // Login Method for User
  signin(formData: any) {
    return this.http.post(this.baseUrl + '/signin', formData);
  }
}
