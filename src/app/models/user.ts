export interface userregister {
    userName: string;
    name: string;
    phone: string;
    email: string;
    password: string
}

export interface usercred {
    email: string;
    password: string;
}

export interface loginresp {
    data: any;
    token: string;
    email: string,
    userRole: string;
    _id: string,
    company: string,

}
export interface tempusers {
    data: any;

}
export interface ApprovedUsers {
    data: any;

}
export interface UpUser {
    data: any;
    email:string;

}
export interface UpUserRes {
    obj: any;
}
export interface DirectComReg {
    company:string;
    contact:string;
    email:string;
    password:string;
    companyurl:string;
    userRole:string;
    city:string;
    address:string;
}
export interface DirectComRegRes {
    obj: any;
}
export interface deleteTempAcc {
    email: string;
}
export interface deleteUserAcc {
    email: string;
}
export interface approveTempAcc {
    email: string;
}
export interface TempComReg {
    company:string;
    contact:string;
    email:string;
    password:string;
    companyurl:string;
    userRole:string;
    city:string;
    address:string;
}
