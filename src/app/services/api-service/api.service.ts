import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { addCategory, addSubCategory, allCategory, mainCategory, UpCategory, UpSubCategory } from '../../models/category';
import { JobAdDelete, JobAdPending } from '../../models/jobApproval';
import { com_dash } from '../../models/dashboard';
import { comJob } from '../../models/jobPost';

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
    return this.http.post<any>(this.baseUrl + 'addcategory', _data, { withCredentials: true });
  }
  ProceedAddSubCat(_data: addSubCategory) {
    return this.http.post<any>(this.baseUrl + 'add-subcategory' + '/' + _data.mainCatId, _data.categoryData, { withCredentials: true });
  }
  ProceedUpCat(_data: UpCategory) {
    return this.http.put<any>(this.baseUrl + 'update-Category' + '/' + _data.oldCategory, _data.jobcategory);
  }
  ProceedSubUpCat(_data: UpSubCategory) {
    return this.http.put<any>(this.baseUrl + 'update-sub-catgory' + '/' + _data.oldCategory, _data.catInfo);
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

  processedGetJobAd() {
    return this.http.get<any>(this.baseUrl + 'displayPost');
  }
  processedDeleteJobPending(_data: JobAdDelete) {
    return this.http.get<any>(this.baseUrl + 'post/delete' + '/' + _data.jobid, { withCredentials: true });
  }
  processedGetPendings() {
    return this.http.get<any>(this.baseUrl + 'temp/advertiesment');
  }
  processedAppJobPending(_data: JobAdPending) {
    return this.http.get<any>(this.baseUrl + 'temp/approve' + '/' + _data.jobid, { withCredentials: true });
  }

  //list all of APIs related company Dashboard
  processedGetComAds(_data: com_dash) {
    return this.http.get<any>(this.baseUrl + 'post/showcount' + '/' + _data._id, { withCredentials: true });
  }
  processedGetAdsListnings(_data: com_dash) {
    return this.http.get<any>(this.baseUrl + 'appCountApproval' + '/' + _data._id, { withCredentials: true });
  }
  processedGetApplications(_data: com_dash) {
    return this.http.get<any>(this.baseUrl + 'TotalappCount' + '/' + _data._id, { withCredentials: true });
  }

  //list all of APIs related company Job post
  processedGetJobPosts(_data: comJob) {
    return this.http.get<any>(this.baseUrl + 'add-display' + '/' + _data._id, { withCredentials: true });
  }
  processedDeletePost(_data: comJob) {
    return this.http.get<any>(this.baseUrl + 'post/delete' + '/' + _data._id, { withCredentials: true });
  }
}
