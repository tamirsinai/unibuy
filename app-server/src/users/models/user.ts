export interface BasicUser {
    email:string;
    password:string;
    name?:string;
}

export interface User extends BasicUser {
    _id:string;
    isAdmin:boolean;
    isSeller:boolean;
    createdAt:Date;
    updatedAt:Date;
}
