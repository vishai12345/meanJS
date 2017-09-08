import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { LoginService } from '../Service/login.service';

@Injectable()
export class VerifyGaurd implements CanActivate  {
  isStatus:boolean;
  isVerified:boolean;
  constructor(private loginService:LoginService, private route: Router){}
  canActivate() {
    if(this.getResponse()){
      if(this.isVerified){
        this.route.navigate(['/profile']);
        return false;
      }else{
        return true;
      }
    }else{
      this.route.navigate(['/signup']);
      return false;
    }
  }

  getResponse(){
    var user = JSON.parse(localStorage.getItem('currentUser'));
    if(user === null || user === undefined){
      return false;
    }
    this.isVerified = user.isVerified;
    return true;
  }
}
