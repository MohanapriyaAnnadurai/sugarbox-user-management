import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { first } from 'rxjs/operators';
import { ApiService } from '../_services/api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PagerService } from '../_services/pager.service';
import { UsersDetail } from '../_models/UsersDetail';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {
  public resAllUsers:  any[] = [];
  public resClient:  any[] = [];
  public filteredUsers:  any[] = [];
  public OrgpagedItems:  any[] = [];
  fullUserLoading = true;
  uniqueArray:any[];
  FilterNameDisplay: string;
  // paged items
  pagedItems: any[];
  FilterUserByName = '';
  selectedItem: string;
  public UsersDetail: UsersDetail;
  constructor(private formBuilder: FormBuilder, private apiService: ApiService, private pagerService: PagerService) {
    this.FilterNameDisplay = "All Organisations";
    this.UsersDetail = JSON.parse(localStorage.getItem('UsersDetail'));
  }
  // pager object
  UserEmail: string;
  pager: any = {};
  ngOnInit() {
    this.loadAllUsers();
  }
  private loadAllUsers() {
    this.apiService.getAllUsers().pipe(first()).subscribe((Users:any) => { 
      this.resAllUsers = Users.data;
      this.pagedItems = Users.data;
      this.uniqueArray= Array.from(new Set(this.resAllUsers.map((item: any) => item.Organization)))
      this.StatusFilter('All');
      this.setPage(1);
      this.fullUserLoading = false;
    });
}
ApplyStatus(status : boolean){
  if (status) {
    return '<label class="status-state inactive-state">Inactive</label>';
  } else {
    return '<label class="status-state active-state">Active</label>';
  }
  
}
getName(name: string) {
  if(name!=null){
    let StringToSplit = name;
    let NewName = StringToSplit.split("@");
    let finalName = NewName[0].replace('.', ' ');
    return finalName;  
  }else{
    return '--';  
  }
}
public FilterByName(){  
  //console.log();
  if(this.FilterUserByName.length === 0){
    this.filteredUsers = this.resAllUsers;
  }else{
    this.filteredUsers = this.resAllUsers.filter(item => item.Name.toLocaleLowerCase().indexOf(this.FilterUserByName.toLocaleLowerCase()) > -1);
  }
  // | userfilter:FilterUserByName:'Name'
  this.setPage(1);
}
public ClientFilter(Organization : string){
  //console.log(Organization);
  if(Organization!="All"){
    this.FilterNameDisplay = Organization;
    this.filteredUsers = this.resAllUsers.filter(res => res.Organization === Organization);
  }else{
    this.FilterNameDisplay = "All Organisations";
    this.filteredUsers = this.resAllUsers;
  }
  this.StatusFilter("All");
  this.setPage(1);
}
public StatusFilter(status:string){  
  this.selectedItem = status;
  if(status=='All' && this.FilterNameDisplay=="All Organisations"){
    this.FilterUserByName = '';
    this.filteredUsers = this.resAllUsers;  
  }else if(status=='All' && this.FilterNameDisplay!="All Organisations"){
    this.FilterUserByName = '';
    this.filteredUsers = this.resAllUsers.filter(res => res.Organization === this.FilterNameDisplay);  
  }else if(status=='Active' && this.FilterNameDisplay!="All Organisations"){
    this.filteredUsers = this.resAllUsers.filter(res => res.IsBlocked === false && res.Organization === this.FilterNameDisplay);
  }else if(status=='Inactive' && this.FilterNameDisplay!="All Organisations"){
    this.filteredUsers = this.resAllUsers.filter(res => res.IsBlocked === true && res.Organization === this.FilterNameDisplay);
  }else if(status=='Invited' && this.FilterNameDisplay!="All Organisations"){
    this.filteredUsers = this.resAllUsers.filter(res => res.IsBlocked === 'NULL' && res.Organization === this.FilterNameDisplay);
  }else if(status=='Active'){
    this.filteredUsers = this.resAllUsers.filter(res => res.IsBlocked === false);
  }else if(status=='Inactive'){
    this.filteredUsers = this.resAllUsers.filter(res => res.IsBlocked === true);
  }else if(status=='Invited'){
    this.filteredUsers = this.resAllUsers.filter(res => res.IsBlocked === 'NULL');
  }else{
    this.filteredUsers = this.resAllUsers;
  }
  this.setPage(1);
}
splitType(str:string) {
  var res = str.split(" ");
  return res[0];
}
splitRole(str:string) {
  var res = str.split(" ");
  return res[1];
}

setPage(page: number) {
  // get pager object from service
  
  this.pager = this.pagerService.getPager(this.filteredUsers.length, page);
  
  // get current page of items
  this.pagedItems = this.filteredUsers.slice(this.pager.startIndex, this.pager.endIndex + 1);
  //console.log(this.pagedItems);
}
}
