import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { LoginComponent } from './user/login/login.component';
import { AdminComponent } from './admin/admin.component';
import { HomeComponent } from './home/home.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { BookslotComponent } from './home/bookslot/bookslot.component';
import { GetcertificateComponent } from './home/getcertificate/getcertificate.component';
import { SummaryComponent } from './admin/summary/summary.component';
import { UpdatecampComponent } from './admin/updatecamp/updatecamp.component';
import { AddcampComponent } from './admin/addcamp/addcamp.component';
import { AuthGuard } from './shared/auth-guard';
import { MedicoComponent } from './medico/medico.component';
import { ReservedUsersComponent } from './medico/reserved-users/reserved-users.component';
import { CertificateComponent } from './certificate/certificate.component';

export const appRoutes: Routes = [
  {
    path: 'signup',
    component: UserComponent,
    canActivate: [AuthGuard],
    children: [{ path: '', component: SignUpComponent }],
    data: {
      userType: 'non-logged-in',
    },
  },
  {
    path: '',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'non-logged-in',
    },
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [AuthGuard],
    data: {
      userType: 'non-logged-in',
    },
  },

  {
    path: 'admin',
    component: AdminComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'summary', pathMatch: 'full' },
      { path: 'summary', component: SummaryComponent },
      { path: 'updatecamp', component: UpdatecampComponent },
      { path: 'addcamp', component: AddcampComponent },
    ],
    data: {
      userType: 'admin-logged-in',
    },
  },
  {
    path: 'home',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
      { path: 'dashboard', component: DashboardComponent },
      { path: 'bookslot', component: BookslotComponent },
      { path: 'getcertificate', component: GetcertificateComponent },
      { path: 'thecertificate', component: CertificateComponent },
    ],
    data: {
      userType: 'user-logged-in',
    },
  },
  {
    path: 'medico',
    component: MedicoComponent,
    canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: 'reservations', pathMatch: 'full' },
      { path: 'reservations', component: ReservedUsersComponent },
    ],
    data: {
      userType: 'medico-logged-in',
    },
  },
];
