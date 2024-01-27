import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Router, RouterModule } from '@angular/router';
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
import { UserContentModel } from '../services/interfaces/interface.service';
import { ServerApiService } from '../services/server/server-api.service';
import { UserService } from '../services/userMgmt/user.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content-submission',
  standalone: true,
  imports: 
  [
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
    ReactiveFormsModule,
    HttpClientModule,
    RouterModule
  ],
  templateUrl: './content-submission.component.html',
  styleUrl: './content-submission.component.scss'
})
export class ContentSubmissionComponent implements OnInit {

  contentForm : FormGroup
  showLoading : boolean = false ;
  regsisterationReponse : string = null;
  registerError : boolean = false ;
  showErrorMessage : boolean = false;
  private activeIDSubscription : Subscription
  private activeUserId = null ;



  constructor(
    private fb: FormBuilder,
    private router : Router,
    private server:ServerApiService,
    private Users : UserService
  )
  {
    this.activeIDSubscription = this.Users.activeUserIdObservble.subscribe(
      (e) => {this.activeUserId = e;}
    );
  }
  ngOnInit(): void {
    this.buildContentSubmissionForm();
  }

  private buildContentSubmissionForm()
  {
    this.contentForm = this.fb.group({
      title : ['', [Validators.required]],
      description : ['', [Validators.required]],
      link: ['', [Validators.required]],
      info: ['', ],
    });
  }



  async callSubmitContentApi()
  {
    console.log("here")
    this.showLoading = true ;
    let newContent : UserContentModel = 
    {
      UserId:this.activeUserId,
      Title : this.contentForm.controls.title.value,
      Description: this.contentForm.controls.description.value,
      Link: this.contentForm.controls.link.value,
      Info: this.contentForm.controls.info.value

    
    }
    ;

    try
    {
      await this.server.addUserContentFunction(newContent).then
      (
        (fulfilled:any) =>
        {
          this.showErrorMessage = true;
          this.regsisterationReponse = fulfilled.Message ;
          this.showLoading = false;
          this.registerError = false;
          this.contentForm.reset();
        },
        (rejected) =>
        {
          console.log(rejected,"rejected");
          this.showErrorMessage = true;
          this.regsisterationReponse = rejected.Message ;
          this.showLoading = false;
          this.registerError = true;

        }
      )
     
      
      setTimeout(() => {
        this.showErrorMessage = false ;
      }, 3000);
    }
    catch(err)
    {
      this.showLoading = false;
      console.error(err) ;
    }
  

  }

}
