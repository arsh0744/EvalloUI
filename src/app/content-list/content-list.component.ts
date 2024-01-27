import { Component, OnDestroy, OnInit } from '@angular/core';
import { UserService } from '../services/userMgmt/user.service';
import { Subscription } from 'rxjs';
import { ServerApiService } from '../services/server/server-api.service';
import { UserContentModel } from '../services/interfaces/interface.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
import { ContentSubmissionComponent } from '../content-submission/content-submission.component';

@Component({
  selector: 'app-content-list',
  standalone: true,
  imports: [
    CommonModule,
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
    ContentSubmissionComponent,
    RouterModule
  ],
  templateUrl: './content-list.component.html',
  styleUrl: './content-list.component.scss'
})
export class ContentListComponent implements OnInit,OnDestroy {

  private activeIDSubscription : Subscription
  private activeUserId = null ;

  userContentArray : UserContentModel[] = [] ;

  constructor(private Users : UserService,private server:ServerApiService,)
  {
  this.activeIDSubscription = this.Users.activeUserIdObservble.subscribe(
    (e) => {this.activeUserId = e;}
  );

  }

  
  ngOnInit(): void {
    this.userContentArray = [] ;
    this.server.getUserContentFunction(this.activeUserId)
              .then(
                (res:any) =>
                {
                  if(res.Error!=true)
                  {
                    this.userContentArray = res.Message.message ;
                  }
                  console.log(res);
                },
                (err) =>
                {
                  console.error(err);
                }
              )
              .catch(
                (err) =>
                {
                  console.error(err);
                }
              )
  }

  ngOnDestroy()
  {
    this.activeIDSubscription.unsubscribe();
  }

}
