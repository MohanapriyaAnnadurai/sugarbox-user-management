import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Router } from '@angular/router';
import { Http } from '@angular/http';
import { map } from 'rxjs/operators';
import { EnvService } from '../env.service';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json'
    })
};
@Injectable()
export class AuthenticationService {
    ApiUrl: string;
    //private loggedIn = new BehaviorSubject<boolean>(false);
    constructor(private httpClient: HttpClient, public env: EnvService) {
        this.ApiUrl = env.apiUrl;
    }

    login(username: string, password: string) {
        return this.httpClient.post(this.ApiUrl+'/api/login', {username: username, password: password}, httpOptions);
    }
  
    forgot(forgotFormObj) {
        return this.httpClient.post(this.ApiUrl+'/api/forgotpassword', forgotFormObj,httpOptions);
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
    }
}