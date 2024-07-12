import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { allCategory, mainCategory } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  //list all of APIs related user
  ProceedGetAllSubCat() {
    return this.http.get<mainCategory>(this.baseUrl + 'get-all-Sub-Categories');
  }
  ProceedGetAllMainCat() {
    return this.http.get<allCategory>(this.baseUrl + 'get-all-category');
  }
}
