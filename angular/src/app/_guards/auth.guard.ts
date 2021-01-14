import { Injectable } from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
@Injectable()
export class AuthGuard implements CanActivate {
    private loggedIn = new BehaviorSubject<boolean>(false);
    constructor(private router: Router) { }

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        // console.log(route);
        if (localStorage.getItem('currentUser')) {
            // console.log(route.data.roles);
            //console.log(localStorage.getItem('jwtToken'));
            // logged in so return true
            //this.router.navigate(['/dashboard']);
            const currentUser = JSON.parse(localStorage.getItem('UsersDetail'));
        // console.log(currentUser);
        if (currentUser) {
            // check if route is restricted by role
            // console.log(route.data.roles);
            // console.log(route.data.roles.indexOf(currentUser.UserRole));
            if (route.data.roles && route.data.roles.indexOf(currentUser.UserRole) === -1) {
                // role not authorised so redirect to home page
                this.router.navigate(['/']);
                return false;
            }
 
            // authorised so return true
            return true;
        }
            this.loggedIn.next(true);
            return true;
        }
        
        // not logged in so redirect to login page with the return url
        this.router.navigate(['/login'], { queryParams: { returnUrl: state.url }});
        return false;
    }
}