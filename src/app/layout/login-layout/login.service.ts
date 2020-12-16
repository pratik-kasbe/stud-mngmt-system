import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
url='http://localhost:3000/admin'
  constructor(private httpClient:HttpClient) { }
  getCredentials(){
return this.httpClient.get(this.url)
  }
}
