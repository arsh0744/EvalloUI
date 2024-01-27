import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserRegistrationModel } from './services/interfaces/interface.service';
import { ServerApiService } from './services/server/server-api.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { UserService } from './services/userMgmt/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})


export class AppComponent  implements OnInit {

  private activeIDSubscription : Subscription
  activeUserId = null ;
  


  constructor(
    private Users : UserService
    )
  {
    this.activeIDSubscription = this.Users.activeUserIdObservble.subscribe(
      (e) => {this.activeUserId = e;}
    );
  }

  ngOnInit(): void {
    
  }

 

  

 

 





}
