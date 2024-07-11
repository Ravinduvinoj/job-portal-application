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
    return this.http.post<loginresp>(this.baseUrl + 'login', _data,{withCredentials:true});
  }
<<<<<<< HEAD

=======
  ProceedTempUsers() {
    return this.http.get<tempusers>(this.baseUrl + 'getalltempuser');
  }
  ProceedApprovedUsers() {
    return this.http.get<ApprovedUsers>(this.baseUrl + 'user-accounts');
  }
  ProceedUpdateUser(_data:UpUser) {
    return this.http.put<UpUserRes>(this.baseUrl + 'update-user'+'/'+_data.email,_data.data);
  }
  ProceedCompanyRegDirect(_data: DirectComReg) {
    return this.http.post<DirectComRegRes>(this.baseUrl + 'direct-register', _data);
  }
  ProceedDeleteTemAcc(_data:deleteTempAcc) {
    return this.http.get<any>(this.baseUrl + 'delete-tempacc'+'/'+_data.email);
  }
  ProceedDeleteUserAcc(_data:deleteUserAcc) {
    return this.http.get<any>(this.baseUrl + 'delete-useracc'+'/'+_data.email);
  }
  ProceedApproveTemAcc(_data:approveTempAcc) {
    return this.http.get<any>(this.baseUrl + 'approve-tempacc'+'/'+_data.email);
  }
  ProceedCompanyRegTemp(_data: TempComReg) {
    return this.http.post<any>(this.baseUrl + 'temp-register', _data,{withCredentials:true});
  }
>>>>>>> 5048ed4 (up)
}
