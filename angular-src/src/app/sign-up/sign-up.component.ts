import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidatorService } from '../Service/validator.service';
import { LoginService } from '../Service/login.service';
import { Router }  from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.css'],
})
export class SignUpComponent implements OnInit {

  email:string;
  password:string;
  message:string;
  constructor(
      private service:ValidatorService,
      private loginService:LoginService,
      private router: Router,
      private _flashMessagesService: FlashMessagesService
    ) { }

  ngOnInit() {
    var profile = this.loginService.getProfile().subscribe(data => {
      var user = data.json()
      if(user){
        this.router.navigate(['/profile']);
      }
    })
  }

  submitSignUp(){
  	const user = {
  		email:this.email,
  		password:this.password
  	}
    var isEmpty = this.service.checkEmail(user.email);
    if(isEmpty === false){
      this.message = 'Email is required';
      this.flashMessage();
      return false;
    }

    var isEmail = this.service.validateUserEmail(user.email);
    if(isEmail === false){
      this.message = 'Email is invalid';
      this.flashMessage();
      return false;
    }

    var isPassword = this.service.validateUserPassword(user.password);
    if(isPassword === false){
      this.message = 'Password is required';
      this.flashMessage();
      return false;
    }

    var signedUser = this.loginService.loginUser(user).subscribe(data => {
      if(data.json().error === false || data.json().error === null){
        this.message = data.json().message;
        this.flashMessage();
        return false;
      }else{
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(data.json().user));
        this.router.navigate(['/'])
      }
    });
  }

  flashMessage(){
    this._flashMessagesService.show(this.message, { cssClass: 'alert-danger', timeout: 5000 });
  }
}
