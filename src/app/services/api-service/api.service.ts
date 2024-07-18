import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { addCategory, addSubCategory, allCategory, mainCategory, UpCategory, UpSubCategory } from '../../models/category';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  baseUrl = environment.apiUrl;

  //list all of APIs related Category & sub Category
  ProceedGetAllSubCat() {
    return this.http.get<mainCategory>(this.baseUrl + 'get-all-Sub-Categories');
  }
  ProceedGetAllMainCat() {
    return this.http.get<allCategory>(this.baseUrl + 'get-all-category');
  }
  ProceedAddCat(_data: addCategory) {
    return this.http.post<any>(this.baseUrl + 'addcategory', _data,{withCredentials:true});
  }
  ProceedAddSubCat(_data: addSubCategory) {
    return this.http.post<any>(this.baseUrl + 'add-subcategory'+'/'+_data.mainCatId, _data.categoryData,{withCredentials:true});
  }
  ProceedUpCat(_data: UpCategory) {
    return this.http.put<any>(this.baseUrl + 'update-Category'+'/'+_data.oldCategory, _data.jobcategory);
  }
  ProceedSubUpCat(_data: UpSubCategory) {
    return this.http.put<any>(this.baseUrl + 'update-sub-catgory'+'/'+_data.oldCategory, _data.catInfo);
  }

   //list all of APIs related administrator Dashboard
   processedGetComCount() {
    return this.http.get<any>(this.baseUrl + 'companycount');
  }
  processedGetAdCount() {
    return this.http.get<any>(this.baseUrl + 'adCount');
  }
  processedGetAppCount() {
    return this.http.get<any>(this.baseUrl + 'appCount');
  }
  processedGetSeekerCount() {
    return this.http.get<any>(this.baseUrl + 'Jobseeker-Count');
  }

   //list all of APIs related administrator Jon Approval

   processedGetJobPendings() {
    return this.http.get<any>(this.baseUrl + 'displayPost');
  }
}
