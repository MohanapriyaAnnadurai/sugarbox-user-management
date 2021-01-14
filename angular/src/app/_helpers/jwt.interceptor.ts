import {Injectable} from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse
} from '@angular/common/http';
import {AuthenticationService} from '../_services/authentication.service';
import {Observable, of} from 'rxjs';
import {Router} from "@angular/router";
import {catchError} from "rxjs/internal/operators";
@Injectable()
export class JwtInterceptor implements HttpInterceptor {
    private error:string;
    constructor(public auth: AuthenticationService, private router: Router) {
    }    
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        // add authorization header with jwt token if available
        let currentUser = JSON.parse(localStorage.getItem('currentUser'));
        if (currentUser && currentUser) {
            request = request.clone({
                setHeaders: { 
                    Authorization: 'Bearer '+currentUser
                }
            });
        }

        //return next.handle(request);
        /**
     * continues request execution
     */
    return next.handle(request).pipe(catchError((error, caught) => {
        //intercept the respons error and displace it to the console
        console.log(error);
        this.handleAuthError(error);
        return of(error);
      }) as any);
  }
  /**
   * manage errors
   * @param err
   * @returns {any}
   */
  private handleAuthError(err: HttpErrorResponse): Observable<any> {
    //handle your auth error or rethrow
    if (err.status === 401) {
      //navigate /delete cookies or whatever
      console.log('handled error ' + err.status);
      this.router.navigate(['/login']);
      // if you've caught / handled the error, you don't want to rethrow it unless you also want downstream consumers to have to handle it as well.
      return of(err.message);
    }
    throw this.error;
  }    
}