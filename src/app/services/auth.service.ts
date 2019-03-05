import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient, HttpHeaders } from "@angular/common/http";

@Injectable()
export class AuthService {
  authenticated:boolean;
  url:string = "http://localhost:3000/";
  data_user:any;
  constructor(public router: Router,private http: HttpClient) {
    this.authenticated = false;
  }

  public login(data) {
    return this.http.post(`${this.url}auth/login`,data);
  }

  public isAuthenticated(): boolean {
    return this.authenticated;
  }
  public logout() {
     this.authenticated= false;
     this.router.navigate(['login']);
  }
  public handleAuthentication(): void {
  }
  public register(data){
    return this.http.post(`${this.url}users`,data);
  }
  changeAutenticated(resp){
    this.authenticated = true;
    this.data_user =resp;
  }
  getUser(){
    return this.data_user ;
  }
  public isAdmin(): boolean {
    if(this.data_user.data_user[0].rol == "admin"){
      return true;
    }
    else{
      return false;
    }
  }

}