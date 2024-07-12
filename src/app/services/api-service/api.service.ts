import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { addCategory, allCategory, mainCategory, UpCategory } from '../../models/category';

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
  ProceedAddCat(_data: addCategory) {
    return this.http.post<any>(this.baseUrl + 'addcategory', _data,{withCredentials:true});
  }
  ProceedUpCat(_data: UpCategory) {
    return this.http.put<any>(this.baseUrl + 'update-Category'+'/'+_data.oldCategory, _data.jobcategory);
  }
}
