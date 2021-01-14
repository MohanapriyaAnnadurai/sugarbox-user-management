import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';
import { ApiService } from '../_services/api.service';
import { AlertService } from '../_services/alert.service';
import { AuthenticationService } from '../_services/authentication.service';
import { UserService } from '../_services/user.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.css']
})
export class ForgotComponent implements OnInit {

  loginForm: FormGroup;
  loadingForgot = false;
  submitted = false;
  returnUrl: string;
  response: any[] = [];
  ressecurityquestions: any[] = [];
  forgot:{
    Email: string,
    q1: string,
    a1: string,
    q2: string,
    a2: string
  };
  constructor(
      private formBuilder: FormBuilder,
      private userService: UserService,
      private apiService: ApiService,
      private route: ActivatedRoute,
      private router: Router,
      private authenticationService: AuthenticationService,
      private alertService: AlertService,
      public toastr: ToastrManager) {}

  ngOnInit() {
    this.forgot = {
      Email: "",
      q1: "",
      a1: "",
      q2: "",
      a2: ""
    }
    this.loginForm = this.formBuilder.group({
      username: ['', { validators: [Validators.required, Validators.email]}],
      q1: [0, Validators.required],
      a1: ['', Validators.required],
      q2: [0, Validators.required],
      a2: ['', Validators.required],
  });

  // reset login status
  this.authenticationService.logout();
  // get return url from route parameters or default to '/'
  this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  // convenience getter for easy access to form fields
  get f() { return this.loginForm.controls; }

  onSubmit() {
      this.submitted = true;
      // stop here if form is invalid
      if (this.loginForm.invalid) {
          return;
      }
      this.loadingForgot = true;
      this.authenticationService.forgot(this.forgot)
        .pipe(first())
        .subscribe(data => {
            var result=data.toString();
              if(/invalid/g.test(result)==false){
                this.toastr.successToastr(result, 'Success!');
                this.loadingForgot = false;
              }else{
                this.toastr.errorToastr(result, 'Warning!');
                this.loadingForgot = false;
              }
          },
          error => {
              this.toastr.errorToastr('Please enter valid Info', 'Warning!');
              this.alertService.error(error);
              this.loadingForgot = false;
          });
  }
  AvoidSpace(event) {
    var k = event ? event.which :event.keyCode;
    if (k == 32) return false;
}
AvoidFirstSpace(e){
    var str=e.target.value.toString();
    var firstSpace=str.split(" ");
    if (e.which === 32 && firstSpace[0]=="")
          e.preventDefault();
  }
}
