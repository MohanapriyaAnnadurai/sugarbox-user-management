import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first,catchError, retry } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import 'rxjs/add/observable/throw';
import {CookieService} from 'angular2-cookie/core';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;
  username: string;
  password: string;
  rememberme: boolean;
  products$:Observable<any>;   
  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private _cookieService: CookieService) {}

  ngOnInit() {
    this.username = '';
    this.password = '';
    this.rememberme = false;
      if (this._cookieService.get('remember')) {
        this.username = this._cookieService.get('username');
        this.password = this._cookieService.get('password');
        this.rememberme = (this._cookieService.get('remember')=="true")?true:false;
      }
      this.loginForm = this.formBuilder.group({
          username: [this.username, {validators: [Validators.required, Validators.email], updateOn: "blur" }],
          password: [this.password, [Validators.required]],
          rememberme: [this.rememberme]
      });

      this.authenticationService.logout();
      localStorage.removeItem('currentUser');
        localStorage.removeItem('UsersDetail');
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }

  get f() { return this.loginForm.controls; }
  public getProductsUsingAsyncPipe() {     
        this.products$ = this.userService.getAllUsers();  
  } 
  onSubmit() {
      this.submitted = true;
      if (this.loginForm.invalid) {
          return;
      }

      this.loading = true;
      console.log(this.loading);
      this.authenticationService.login(this.f.username.value, this.f.password.value)
        .pipe(first())
        .subscribe(
            data => {
              if(this.f.rememberme.value){
                this._cookieService.put('username', this.f.username.value);
                this._cookieService.put('password', this.f.password.value);
                this._cookieService.put('remember', this.f.rememberme.value);
              }else{
                this._cookieService.removeAll();
              }
                localStorage.setItem('currentUser', JSON.stringify(data)); 
                localStorage.setItem('UsersDetail', JSON.stringify(data['data']));
                this.router.navigate(['/users']);

            },
            (err) => {
              console.log(err);
                this.loading = false;
            });
  }
  AvoidSpace(e: KeyboardEvent) {
    var k = e ? e.which : e.keyCode;
    if (k == 32) return false;
}
getCookie(key: string){
  return this._cookieService.get(key);
}
}
