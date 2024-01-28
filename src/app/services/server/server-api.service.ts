import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UserContentModel, UserRegistrationModel } from '../interfaces/interface.service';
import { UserService } from '../userMgmt/user.service';

@Injectable({
  providedIn: 'root'
})


export class ServerApiService {

  constructor(
    private http : HttpClient,
    private Users : UserService
  ) { }
  //private  BaseUrl =  "http://localhost:3000/.netlify/functions/" ;
  private  BaseUrl =  "https://evalloserver.netlify.app/.netlify/functions/" ;

  url_Create_New_CC = this.BaseUrl + 
                      'api/addNewCC' ;

  async addNewEvalloCCFunc(NewUser :UserRegistrationModel )
  {

    return await new Promise(

     async (resolve,reject) =>
      {
        try
        {
          this.http.post(this.url_Create_New_CC,NewUser).subscribe(
            {
              next: (value:any) => {
                
                setTimeout(() => {
                  this.Users.changeActiveUserId(value.message);
                }, 3000);
                resolve({Error:null,Message: "Registered Successfully,Redirecting"}) ;
              },
              error: (error) => {
                console.error("error",error) ;
                reject({Error:true,Message: "User Not Registered"}) ;
              },
              complete: () => {
               // console.error("complete") ;
              }
            }
            
          )
        }
        catch(err)
        {
          console.error(err);
          reject({Error:true,Message: "User Not Registered"});
        }
      }
    )

   


    
  }



  url_CallLogin = this.BaseUrl + 
                      'api/checkLogin' ;

  async callLoginApi(UserCred)
  {

    return await new Promise(

     async (resolve,reject) =>
      {
        try
        {
          this.http.post(this.url_CallLogin,UserCred).subscribe(
            {
              next: (value) => {
                console.log("next",value) ;
                resolve({Error:null,Message: value}) ;
              },
              error: (error) => {
                console.error("error",error) ;
                reject({Error:true,Message: "User Not Found"}) ;
              },
              complete: () => {
                //console.error("complete") ;
              }
            }
            
          )
        }
        catch(err)
        {
          console.error(err);
          reject({Error:true,Message: "User Not Registered"});
        }
      }
    )

   


    
  }



url_Create_New_Content = this.BaseUrl + 
  'api/addUserContent' ;

async addUserContentFunction(Content :UserContentModel )
{

return await new Promise(

async (resolve,reject) =>
{
try
{
this.http.post(this.url_Create_New_Content,Content).subscribe(
{
next: (value) => {
console.log("next",value) ;
resolve({Error:null,Message: "Content Added Successfully"}) ;
},
error: (error) => {
console.error("error",error) ;
reject({Error:true,Message: "Content Not Added"}) ;
},
complete: () => {
}
}

)
}
catch(err)
{
console.error(err);
reject({Error:true,Message: "User Not Registered"});
}
}
)





}


url_GetUserContent_By_UserId = this.BaseUrl + 
  'api/getUserContent' ;

async getUserContentFunction(UserIdInput)
{

return await new Promise(

async (resolve,reject) =>
{
try
{
this.http.post(this.url_GetUserContent_By_UserId,{UserId:UserIdInput}).subscribe(
{
next: (value) => {
console.log("next",value) ;
resolve({Error:null,Message: value}) ;
},
error: (error) => {
console.error("error",error) ;
reject({Error:true,Message: "Content Not Found"}) ;
},
complete: () => {
}
}

)
}
catch(err)
{
console.error(err);
reject({Error:true,Message: "User Not Registered"});
}
}
)





}

  




}
