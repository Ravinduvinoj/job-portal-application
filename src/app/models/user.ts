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