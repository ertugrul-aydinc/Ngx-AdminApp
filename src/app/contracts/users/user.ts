export class User{
    id:string;
    createdTimestamp:number;
    username:string;
    enabled:boolean;
    totp:boolean;
    emailVerified:boolean;
    firstName:string;
    lastName:string;
    email:string;
    disableableCredentialTypes:any[];
    requiredActions:any[];
    notBefore:number;
    access:Access;
}

export class Access{
    manageGroupMembership:boolean;
    view:boolean;
    mapRoles:boolean;
    impersonate:boolean;
    manage:true;
}