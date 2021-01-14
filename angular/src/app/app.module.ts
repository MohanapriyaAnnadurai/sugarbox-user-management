import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { HttpModule } from '@angular/http';

import { DatePickerModule } from '@syncfusion/ej2-angular-calendars';
import {BsDatepickerModule,BsDatepickerConfig } from 'ngx-bootstrap/datepicker'
// used to create fake backend
import { fakeBackendProvider } from './_helpers/fake-backend';
import { FormsModule } from '@angular/forms';
//import { AppComponent }  from './app.component';

import { AlertComponent } from './_directives/alert.component';
import { AuthGuard } from './_guards/auth.guard';
import { JwtInterceptor} from './_helpers/jwt.interceptor';
import { ErrorInterceptor } from './_helpers/error.interceptor';
import { AlertService } from './_services/alert.service';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { ApiService } from './_services/api.service';
import { PagerService } from './_services/pager.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ForgotComponent } from './forgot/forgot.component';
import { HeaderComponent } from './header/header.component';
import { UserComponent } from './user/user.component';
import { UserfilterPipe } from './user/userfilter.pipe';
import { Select2Module } from 'ng2-select2';
import { EnvServiceProvider } from './env.service.provider';
import { CookieService } from 'angular2-cookie/services/cookies.service';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ForgotComponent,
    HeaderComponent,
    UserComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    DatePickerModule,
    BsDatepickerModule.forRoot(),
    Select2Module
  ],
  providers: [
    AuthGuard,
    AlertService,
    AuthenticationService,
    UserService,
    ApiService,
    PagerService,
    EnvServiceProvider,
    CookieService,
    // provider used to create fake backend
    fakeBackendProvider
],
  bootstrap: [AppComponent]
})
export class AppModule { }
