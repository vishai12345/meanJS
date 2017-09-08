import { Injectable } from '@angular/core';
import {CanActivate, Router} from '@angular/router';
import { LoginService } from '../Service/login.service';

@Injectable()
export class RouteGaurd implements CanActivate  {
    isVerified:boolean;
    isStatus:boolean;
    constructor(private loginService:LoginService, private route: Router){}
      canActivate() {
      if(this.getResponse()){
        if(this.isVerified){
          return true;
        }else{
          this.route.navigate(['/verify']);
          return false;
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
