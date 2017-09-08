import { Component, OnInit,OnDestroy } from '@angular/core';
import { LoginService } from '../Service/login.service';
import { Router }  from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidatorService } from '../Service/validator.service';
import { EditProfileServiceService } from '../Service/edit-profile-service.service';
import {ToasterModule, ToasterService, ToasterConfig, Toast} from 'angular2-toaster';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.css'],
})
export class EditProfileComponent implements OnInit ,OnDestroy {

  id:string;
  email:string;
  mobile:string;
  message:string;
  title:string = 'Error';
  class:string = 'error';

  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right'
  });
  constructor(
    private loginService:LoginService,
    private router: Router,
    private service:ValidatorService,
    private _flashMessagesService: FlashMessagesService,
    private editService : EditProfileServiceService,
    private toasterService: ToasterService
  ) { }

  ngOnInit() {
    this.loginService.getProfile().subscribe(data => {
      var user = data.json()
        this.id = user.user._id;
        this.email = user.user.email;
        this.mobile = user.user.mobile;
    })
  }

  ngOnDestroy(){}

  popToast() {
    var toast: Toast = {
      type: this.class,
      title: this.title,
      body: this.message
    };

    this.toasterService.pop(toast);
  }

  onSubmitProfile(){
    const user = {
       email : this.email,
         _id : this.id,
      mobile : this.mobile
    }

    var isEmpty = this.service.checkEmail(user.email);
    if(isEmpty === false){
      this.message = 'Email is required';
      this.popToast();
      return false;
    }

    var isEmail = this.service.validateUserEmail(user.email);
    if(isEmail === false){
      this.message = 'Email is invalid';
      this.popToast();
      return false;
    }

    var isMobile = this.service.validateUserMobile(user.mobile);
    if(isMobile === false){
      this.message = 'Mobile is required';
      this.popToast();
      return false;
    }

    var updateUser = this.editService.updateProfile(user).subscribe(data => {
      if(data.json().success === false || data.json().success === null){
        this.message = data.json().message;
        this.popToast();
        return false;
      }else{
        this.message = data.json().message;
        this.class   = 'success';
        this.title   = 'Success';
        this.popToast();
      }
    });
  }
}
