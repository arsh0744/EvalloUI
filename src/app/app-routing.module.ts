import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { CcDashboardComponent } from './cc-dashboard/cc-dashboard.component';
import { MainPageComponent } from './main-page/main-page.component';
import { ContentSubmissionComponent } from './content-submission/content-submission.component';
import { ContentListComponent } from './content-list/content-list.component';




const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'cc-dashboard', component: CcDashboardComponent },
  { path: 'app-content-submission', component: ContentSubmissionComponent },
  { path: 'content-list', component: ContentListComponent }
];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes),
    
  ],
  exports: [RouterModule],
})
export class AppRoutingModule { }
