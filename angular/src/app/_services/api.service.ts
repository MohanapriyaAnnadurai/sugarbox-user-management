import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { EnvService } from '../env.service';
import { User } from '../_models/user';
import { get } from 'selenium-webdriver/http';
import { CommentStmt } from '@angular/compiler';
const httpOptions = {
    headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Access-Control-Allow-Methods': 'GET, POST, OPTIONS, PUT, PATCH, DELETE',
    })
};
@Injectable()
export class ApiService {
    ApiUrl: string;
    constructor(private http: HttpClient, private https: Http, public env: EnvService) {
        // console.log(env);
        this.ApiUrl = env.apiUrl;
    }

    getAllUsers() {
        return this.http.get(this.ApiUrl+'/api/users',httpOptions);
    }
    
    getuserDetails() {
        return this.http.get(this.ApiUrl+'/api/User/Detail');
    }
    
}