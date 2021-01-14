import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { User } from '../_models/user';
import { EnvService } from '../env.service';
@Injectable()
export class UserService {
    ApiUrl: string;
    constructor(private http: HttpClient, public env: EnvService) {
        // console.log(env);
        this.ApiUrl = env.apiUrl;
    }
    getAllUsers() {
        return this.http.get(this.ApiUrl+'/api/User/All');
    } 
}