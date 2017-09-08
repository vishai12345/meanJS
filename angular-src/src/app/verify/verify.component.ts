import { Component, OnInit } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidatorService } from '../Service/validator.service';
import { LoginService } from '../Service/login.service';
import { VerifyUserService } from '../Service/verify-user.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-verify',
  templateUrl: './verify.component.html',
  styleUrls: ['./verify.component.css']
})
export class VerifyComponent implements OnInit {
  verification_code:string;
  message;string;
  constructor(
    private _flashMessagesService: FlashMessagesService,
    private service:ValidatorService,
    private loginService:LoginService,
    private router: Router,
    private verifyService:VerifyUserService,
  ) { }

  ngOnInit() {

  }


  submitVerify(){
    var isValidToken = this.service.validateToken(this.verification_code);
    if(isValidToken === false){
      this.message = 'Verification code is required';
      this.flashMessage();
      return false;
    }
    const data = {
      verification_code : this.verification_code
    }

    this.verifyService.verifyToken(data).subscribe(data => {
        if(data.json().success === false){
          this.message = data.json().message;
          this.flashMessage();
        }else{
          localStorage.removeItem('currentUser');
          localStorage.setItem('currentUser', JSON.stringify(data.json().user));
          this.router.navigate(['/dashboard'])
        }
    });
  }

  flashMessage(){
    this._flashMessagesService.show(this.message, { cssClass: 'alert-danger', timeout: 5000 });
  }
}
