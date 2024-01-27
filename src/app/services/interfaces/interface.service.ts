import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class InterfaceService {

  constructor() { }

  

}

export interface UserRegistrationModel
{
    Name:  String  ,
    username:  String ,
    userEmail:  String,
    userPassword:  String
}
export interface UserContentModel
{
    UserId : string;
    Title:  String  ,
    Description:  String ,
    Link:  String,
    Info:  String
}