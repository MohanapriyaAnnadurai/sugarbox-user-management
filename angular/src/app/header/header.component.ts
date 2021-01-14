import { Component, OnInit } from '@angular/core';
import { UsersDetail } from '../_models/UsersDetail';
import { Observable } from 'rxjs/Rx';
import { EnvService } from '../env.service';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  public UsersDetailopt: Observable<{}>;
  public UsersDetail: UsersDetail;
  public FirstName: string;
  public  IsAdmin: boolean;
  public  LastName: string;
  public  UserId: string;
  public  UserRole: string;
  public  UserType: string;
  public folderPath: string;
  Version: string;
  constructor(public env: EnvService) {
    this.Version = env.version;
    this.folderPath = env.folderPath;
    this.UsersDetail = JSON.parse(localStorage.getItem('UsersDetail'));
  }

  ngOnInit() {
    // if(this.UsersDetail==""){
    //   this.userService.getuserDetails().pipe(first()).retry(1).subscribe(users => { 
    //     localStorage.setItem('UsersDetail', JSON.stringify(users));
    // });
    // }
    // this.UsersDetail = this.getUsersDetail().delay(100);
  }
  private getUsersDetail(){
    return JSON.parse(localStorage.getItem('UsersDetail'));
  }
}
