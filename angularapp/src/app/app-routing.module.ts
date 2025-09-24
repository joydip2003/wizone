import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomePageComponent } from './components/home-page/home-page.component';
import { AdminViewSchemeComponent } from './components/admin-view-scheme/admin-view-scheme.component';
import { AdminWifiSchemeComponent } from './components/admin-wifi-scheme/admin-wifi-scheme.component';
import { AdminviewappliedrequestComponent } from './components/adminviewappliedrequest/adminviewappliedrequest.component';
import { AdminviewfeedbackComponent } from './components/adminviewfeedback/adminviewfeedback.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { ErrorComponent } from './components/error/error.component';
import { LoginComponent } from './components/login/login.component';
import { SignupComponent } from './components/signup/signup.component';
import { UserViewSchemeComponent } from './components/user-view-scheme/user-view-scheme.component';
import { UseraddfeedbackComponent } from './components/useraddfeedback/useraddfeedback.component';
import { UseraddrequestComponent } from './components/useraddrequest/useraddrequest.component';
import { UserViewAppliedRequestComponent } from './components/userviewappliedrequest/userviewappliedrequest.component';
import { UserviewfeedbackComponent } from './components/userviewfeedback/userviewfeedback.component';
import { AdminContainerComponent } from './components/admin-container/admin-container.component';
import { UserContainerComponent } from './components/user-container/user-container.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'admin/home', component: HomePageComponent },

  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },

  // Admin routes
  { path: 'admin/dashboard', component: DashboardComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/view-schemes', component: AdminViewSchemeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/wifi-schemes/:wifiSchemeId', component: AdminWifiSchemeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/wifi-schemes', component: AdminWifiSchemeComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/nav', component: AdminContainerComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/requests', component: AdminviewappliedrequestComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },
  { path: 'admin/feedbacks', component: AdminviewfeedbackComponent, canActivate: [AuthGuard], data: { role: 'Admin' } },

  // User routes
  { path: 'user/wifi-schemes', component: UserViewSchemeComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/feedback/:wifiSchemeId', component: UseraddfeedbackComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/wifi-req/:wifiSchemeId', component: UseraddrequestComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/nav', component: UserContainerComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/applied-requests', component: UserViewAppliedRequestComponent, canActivate: [AuthGuard], data: { role: 'User' } },
  { path: 'user/feedbacks', component: UserviewfeedbackComponent, canActivate: [AuthGuard], data: { role: 'User' } },

  // Wildcard route
  { path: '**', component: ErrorComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
