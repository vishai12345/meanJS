import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ValidatorService } from '../Service/validator.service';
import { Router }  from '@angular/router';
import { LoginService } from '../Service/login.service';
import { RegisterService } from '../Service/register.service';
import { FlashMessagesService } from 'angular2-flash-messages';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email:string;
  password:string;
  message:string;
  mobile:string;
  constructor(
    private service:ValidatorService,
    private router: Router,
    private loginService:LoginService,
    private registerService:RegisterService,
    private _flashMessagesService: FlashMessagesService,
  ) { }

  ngOnInit() {
    var profile = this.loginService.getProfile().subscribe(data => {
      var user = data.json();
      if(user){
        this.router.navigate(['/profile']);
      }
    })
  }

  onSubmitLogin(){
  	const user = {
  		email:this.email,
  		password:this.password,
      mobile : this.mobile
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

    var isMobile = this.service.validateUserMobile(user.mobile);
    if(isMobile === false){
      this.message = 'Mobile is required';
      this.flashMessage();
      return false;
    }

    var registerUser = this.registerService.registerUser(user).subscribe(data => {
      if(data.json().error === false || data.json().error === null){
        this.message = data.json().message;
        this.flashMessage();
        return false;
      }else{
        localStorage.removeItem('currentUser');
        localStorage.setItem('currentUser', JSON.stringify(data.json().user));
        this.router.navigate(['/profile'])
      }
    });
  }

  flashMessage(){
    this._flashMessagesService.show(this.message, { cssClass: 'alert-danger', timeout: 5000 });
  }

}
