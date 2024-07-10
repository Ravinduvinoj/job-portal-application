import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { loginresp, usercred } from '../../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  
  Proceedlogin(_data: usercred) {
    return this.http.post<loginresp>(this.baseUrl + 'login', _data);
  }
  
}
