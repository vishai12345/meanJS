import { Component, OnInit } from '@angular/core';
import { LoginService } from '../Service/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidatorService } from '../Service/validator.service';
import { EditProfileServiceService } from '../Service/edit-profile-service.service';
import { Router }  from '@angular/router';

@Component({
  selector: 'app-change-password',
  templateUrl: './change-password.component.html',
  styleUrls: ['./change-password.component.css']
})
export class ChangePasswordComponent implements OnInit {

  currentPassword:string;
  newPassword:string;
  confirmPassword:string;
  message:string;
  class:string = 'alert-danger';
  constructor(
    private loginService:LoginService,
    private service:ValidatorService,
    private _flashMessagesService: FlashMessagesService,
    private editService : EditProfileServiceService,
    private router: Router,
  ) { }

  ngOnInit() {

  }

  changePassword(){
    var isPassword = this.service.validateUserPassword(this.currentPassword);
    if(isPassword === false){
      this.message = 'Current Password is required';
      this.flashMessage();
      return false;
    }

    var isPassword = this.service.validateUserPassword(this.newPassword);
    if(isPassword === false){
      this.message = 'New Password is required';
      this.flashMessage();
      return false;
    }

    var isPassword = this.service.validateUserPassword(this.confirmPassword);
    if(isPassword === false){
      this.message = 'Confirm Password is required';
      this.flashMessage();
      return false;
    }

    if(this.newPassword != this.confirmPassword){
      this.message = 'New Password and Confirm Password must be same';
      this.flashMessage();
      return false;
    }

    var data = {
      currentPassword : this.currentPassword,
      newPassword     : this.newPassword,
    }
    this.editService.changePassword(data).subscribe(data => {
        if(data.json().success === true){
          this.reset();
          this.message = data.json().message;
          this.class = 'alert-success';
          this.flashMessage();
        }else{
          this.message = data.json().message;
          this.flashMessage();
        }
    });
  }

  reset(){
    this.currentPassword = null;
    this.newPassword = null;
    this.confirmPassword = null;
  }

  flashMessage(){
    this._flashMessagesService.show(this.message, { cssClass: this.class, timeout: 5000 });
  }

}
