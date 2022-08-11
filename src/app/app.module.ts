import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import {
  HttpClientModule,
  HttpClientXsrfModule,
  HTTP_INTERCEPTORS,
} from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

import { appRoutes } from './routes';
import { LoginComponent } from './user/login/login.component';

import { AdminComponent } from './admin/admin.component';

import { HomeComponent } from './home/home.component';
import { BodyComponent } from './home/body/body.component';
import { SidenavComponent } from './home/sidenav/sidenav.component';
import { BookslotComponent } from './home/bookslot/bookslot.component';
import { DashboardComponent } from './home/dashboard/dashboard.component';
import { GetcertificateComponent } from './home/getcertificate/getcertificate.component';

import { SummaryComponent } from './admin/summary/summary.component';
import { UpdatecampComponent } from './admin/updatecamp/updatecamp.component';
import { AddcampComponent } from './admin/addcamp/addcamp.component';
import { AdminbodyComponent } from './admin/adminbody/adminbody.component';
import { AdminsidenavComponent } from './admin/adminsidenav/adminsidenav.component';
import { Title } from '@angular/platform-browser';

import { AuthInterceptor } from './shared/auth-interceptor';
import { MedicoComponent } from './medico/medico.component';
import { ReservedUsersComponent } from './medico/reserved-users/reserved-users.component';
import { MedicosidenavComponent } from './medico/medicosidenav/medicosidenav.component';
import { MedicobodyComponent } from './medico/medicobody/medicobody.component';
import { MatTable, MatTableModule } from '@angular/material/table';
import { MatSort, Sort, MatSortModule } from '@angular/material/sort';
import { MatAnchor } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { CertificateComponent } from './certificate/certificate.component';
import { QRCodeModule } from 'angularx-qrcode';
import { MDCCircularProgress } from '@material/circular-progress';
import { NgCircleProgressModule } from 'ng-circle-progress';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    SignUpComponent,
    LoginComponent,
    AdminComponent,
    HomeComponent,
    BodyComponent,
    SidenavComponent,
    BookslotComponent,
    DashboardComponent,
    GetcertificateComponent,
    SummaryComponent,
    UpdatecampComponent,
    AddcampComponent,
    AdminbodyComponent,
    AdminsidenavComponent,
    MedicoComponent,
    ReservedUsersComponent,
    MedicosidenavComponent,
    MedicobodyComponent,
    CertificateComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    RouterModule.forRoot(appRoutes),
    HttpClientModule,
    MatTableModule,
    MatSortModule,
    InfiniteScrollModule,
    NgxSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    QRCodeModule,
    NgCircleProgressModule.forRoot({
      radius: 70,
      outerStrokeWidth: 16,
      innerStrokeWidth: 8,
      outerStrokeColor: '#78C000',
      innerStrokeColor: '#C7E596',
      animationDuration: 800,
      animation: true,
    }),
    MatCardModule,
    HttpClientXsrfModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    CookieService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(private titleService: Title) {
    this.titleService.setTitle('MANDRINE pvt ltd');
  }
}
