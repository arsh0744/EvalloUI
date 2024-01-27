import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServerApiService } from '../services/server/server-api.service';
import { UserService } from '../services/userMgmt/user.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
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
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cc-dashboard',
  standalone: true,
  imports: 
  [
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
  templateUrl: './cc-dashboard.component.html',
  styleUrl: './cc-dashboard.component.scss'
})
export class CcDashboardComponent implements OnInit,OnDestroy {

  private activeIDSubscription : Subscription
  private activeUserId = null ;

  constructor(private Users : UserService)
  {
  this.activeIDSubscription = this.Users.activeUserIdObservble.subscribe(
    (e) => {this.activeUserId = e;}
  );

  }

  ngOnInit(): void {
  }

  ngOnDestroy()
  {
    this.activeIDSubscription.unsubscribe();
  }

}
