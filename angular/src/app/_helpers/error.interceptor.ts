import { Injectable } from '@angular/core';
import { HttpRequest, HttpHandler, HttpEvent, HttpInterceptor } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ToastrManager } from 'ng6-toastr-notifications';

import { AuthenticationService } from '../_services/authentication.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
    constructor(private authenticationService: AuthenticationService, public toastr: ToastrManager) { }

    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(request).pipe(catchError(err => {

            if (err.status === 401) {
                // auto logout if 401 response returned from api
                this.authenticationService.logout();
                location.reload(true);
            } else if (err.status === 400) {
                // console.log(err);
                if (err.error.Message == "Invalid User.") {
                    this.toastr.errorToastr(err.error.Message, 'Error!');
                } if (err.error.Message == "Invalid User") {
                    this.toastr.errorToastr(err.error.Message, 'Error!');
                } if (err.error.errorMesg == "Login unsuccessful, Your user is locked, please contact system administrator") {
                    this.toastr.errorToastr(err.error.errorMesg, 'Error!');
                } if (err.error.errorMesg == "Invalid User.") {
                    this.toastr.errorToastr(err.error.errorMesg, 'Error!');
                } else if (err.error.Message == "Password doesnot match.") {
                    this.toastr.errorToastr("Passwords do not match", 'Error!');
                } else if (err.error.Message == "Invite does not exists.") {
                    this.toastr.errorToastr("The link is expired or the user already registered.", 'Error!');
                } else if (err.error.Message == "Invalid code.") {
                    // const l = JSON.parse(err.error.Message);
                    this.toastr.errorToastr(err.error.Message, 'Error!');
                } else if (err.error.Message != "") {
                    const l = JSON.parse(err.error.Message);
                    this.toastr.errorToastr(l.Data, 'Error!');
                }
            }

            const error = err.error.message || err.statusText;
            return throwError(error);
        }))
    }
}