import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private _httpClient: HttpClient) { }
  baseUrl = environment.api;
  postUser(data: any) {
    return this._httpClient.post<any>(`${this.baseUrl}/signupUsersList`, data);
  }
  getUser(){
    return this._httpClient.get<any>(`${this.baseUrl}/signupUsersList`);
  }
}
