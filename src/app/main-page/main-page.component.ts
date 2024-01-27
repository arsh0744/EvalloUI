import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
// MDB Modules
import { MdbAccordionModule } from 'mdb-angular-ui-kit/accordion';
import { MdbCarouselModule } from 'mdb-angular-ui-kit/carousel';
import { MdbCheckboxModule } from 'mdb-angular-ui-kit/checkbox';
import { MdbCollapseModule } from 'mdb-angular-ui-kit/collapse';
import { MdbDropdownModule } from 'mdb-angular-ui-kit/dropdown';
import { MdbFormsModule } from 'mdb-angular-ui-kit/forms';
import { MdbModalModule } from 'mdb-angular-ui-kit/modal';
import { MdbPopoverModule } from 'mdb-angular-ui-kit/popover';
import { MdbRadioModule } from 'mdb-angular-ui-kit/radio';
import { MdbRangeModule } from 'mdb-angular-ui-kit/range';
import { MdbRippleModule } from 'mdb-angular-ui-kit/ripple';
import { MdbScrollspyModule } from 'mdb-angular-ui-kit/scrollspy';
import { MdbTabsModule } from 'mdb-angular-ui-kit/tabs';
import { MdbTooltipModule } from 'mdb-angular-ui-kit/tooltip';
import { MdbValidationModule } from 'mdb-angular-ui-kit/validation';
import { ServerApiService } from '../services/server/server-api.service';
import { UserRegistrationModel } from '../services/interfaces/interface.service';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/userMgmt/user.service';

@Component({
  selector: 'app-main-page',
  standalone: true,
  imports: [
    MdbFormsModule,
    ReactiveFormsModule,
    CommonModule,
    MdbAccordionModule,
    MdbCarouselModule,
    MdbCheckboxModule,
    MdbCollapseModule,
    MdbDropdownModule,
    MdbFormsModule,
    MdbModalModule,
    MdbPopoverModule,
    MdbRadioModule,
    MdbRangeModule,
    MdbRippleModule,
    MdbScrollspyModule,
    MdbTabsModule,
    MdbTooltipModule,
    MdbValidationModule,
  ],
  templateUrl: './main-page.component.html',
  styleUrl: './main-page.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MainPageComponent implements OnInit {

  title = 'Welcome to Evallo';
  ccRegisForm : FormGroup ;
  showLoading : boolean = false ;
  showErrorMessage : boolean = false;
  regsisterationReponse : string = null;
  registerError : boolean = false ;

  loginForm : FormGroup;

  constructor
  (
    private fb: FormBuilder,
    private server:ServerApiService,
    private router : Router,
    private Users : UserService
  )
  {

  }
  ngOnInit()
   {
    this.buildCCRegisForm();
    this.buildLoginForm();
    }
    private buildCCRegisForm()
    {
      this.ccRegisForm = this.fb.group({
        registerName : ['', [Validators.required]],
        registerUsername : ['', [Validators.required]],
        registerEmail: ['', [Validators.required, Validators.email]],
        registerPassword: ['', [Validators.required]],
      });
    }
    private buildLoginForm()
    {
      this.loginForm = this.fb.group({
        loginCred : ['', [Validators.required]],
        loginPass : ['', [Validators.required]],
      });
    }



  async addNewCCForEvallo()
  {
    this.showLoading = true ;
    let newUser : UserRegistrationModel = 
    {
      Name : this.ccRegisForm.controls.registerName.value,
      username: this.ccRegisForm.controls.registerUsername.value,
      userEmail: this.ccRegisForm.controls.registerEmail.value,
      userPassword: this.ccRegisForm.controls.registerPassword.value
    }
    ;

    try
    {
      await this.server.addNewEvalloCCFunc(newUser).then
      (
        (fulfilled:any) =>
        {
          this.showErrorMessage = true;
          this.regsisterationReponse = fulfilled.Message ;
          this.showLoading = false;
          this.registerError = false;
          
            
          setTimeout(() => {
            this.showErrorMessage = false ;
            this.router.navigateByUrl('/content-list')
          }, 3000);

        },
        (rejected) =>
        {
          this.showErrorMessage = true;
          this.regsisterationReponse = rejected.Message ;
          this.showLoading = false;
          this.registerError = true;
          setTimeout(() => {
            this.showErrorMessage = false ;
          }, 3000);

        }
      )
     
    
    }
    catch(err)
    {
      this.showLoading = false;
      console.error(err) ;
    }
  
    




  }


  async callLoginApi()
  {
    this.showLoading = true ;
    let userCreds = 
    {
      identifier : this.loginForm.controls.loginCred.value,
      password: this.loginForm.controls.loginPass.value
    }
    ;

    try
    {
      await this.server.callLoginApi(userCreds).then
      (
        (fulfilled:any) =>
        {
          this.regsisterationReponse = fulfilled.Message ;
          this.showLoading = false;
          this.registerError = false;
          this.router.navigateByUrl('/content-list');
          this.Users.changeActiveUserId(fulfilled.Message.message._id) ;

        },
        (rejected) =>
        {
          console.log(rejected,"rejected");
          this.showErrorMessage = true;
          this.regsisterationReponse = rejected.Message ;
          this.showLoading = false;
          this.registerError = true;
          setTimeout(() => {
            this.showErrorMessage = false ;
          }, 3000);

        }
      )
     
      
      
    }
    catch(err)
    {
      this.showLoading = false;
      console.error(err) ;
    }
    
  }


}
