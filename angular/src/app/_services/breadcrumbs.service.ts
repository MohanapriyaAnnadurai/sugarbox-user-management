import { Injectable } from '@angular/core';
import { Router, NavigationStart } from '@angular/router';
import { Observable, Subject, from } from 'rxjs';
//import { BreadcrumbsModule } from "ng6-breadcrumbs";
@Injectable()
export class MyRoutableComponent {
  //private breadcrumbsService:BreadcrumbsModule
    constructor() {
    }
  
    ngOnInit() {
      //this.breadcrumbs.store([{label: 'Home' , url: '/', params: []},{label: 'Careers' , url: '/careers', params: []}, {label:  'MyCustomRouteLabel' , url: '', params: []} ])
    }
  }