import { Component, OnInit } from '@angular/core';
import { GetAllUserService } from '../Service/get-all-user.service';
import { Router }  from '@angular/router';
import { LoginService } from '../Service/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { ValidatorService } from '../Service/validator.service';
import { EditProfileServiceService } from '../Service/edit-profile-service.service';
import {ToasterModule, ToasterService, ToasterConfig, Toast} from 'angular2-toaster';
import {MdDialog,MdDialogRef} from '@angular/material';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { EditUserComponentComponent } from '../edit-user-component/edit-user-component.component';

@Component({
  selector: 'app-get-user',
  templateUrl: './get-user.component.html',
  styleUrls: ['./get-user.component.css']
})
export class GetUserComponent implements OnInit {

  public config1 : ToasterConfig = new ToasterConfig({
    positionClass: 'toast-top-right'
  });
  activateUsers:[{
    _id:string,
    email:string;
    mobile:string,
    isVerified:boolean
  }];
  activeUser:boolean = false;
  deActiveUser:boolean = false;

  deActivateUsers:[{
    _id:string,
    email:string;
    mobile:string,
    isVerified:boolean
  }];
  id:string;
  email:string;
  mobile:string;
  message:string;
  title:string = 'Error';
  class:string = 'error';
  showEdit:boolean = false;
  userData:string;

  constructor(
    private getAll: GetAllUserService,
    private router: Router,
    private loginService:LoginService,
    private service:ValidatorService,
    private _flashMessagesService: FlashMessagesService,
    private editService : EditProfileServiceService,
    private toasterService: ToasterService,
    public dialog: MdDialog
  ) {}

  ngOnInit() {
    this.fetchAllUser();
  }

  openDialog(user) {
    var data = {
      returnData : user,
      title : 'Delete User',
      body : 'Are you sure to delete this user ?',
      buttonText : 'Delete User'
    }
    let dialogRef = this.dialog.open(ModalDialogComponent, {
      height: '230px',
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.deleteUser(result);
      }
    });
  }

  popToast() {
    var toast: Toast = {
      type: this.class,
      title: this.title,
      body: this.message
    };

    this.toasterService.pop(toast);
  }

  fetchAllUser(){
    this.getAll.getAllUser().subscribe(data => {
      var users  = data.json().data;
      this.activateUsers = users.filter(function (user) {
        return user.isVerified === true && user.user_type == 'User';
      }).sort();
      this.activeUser = this.activateUsers.length <= 0;

      this.deActivateUsers = users.filter(function (user) {
        return user.isVerified === false && user.user_type == 'User';
      }).sort();
      this.deActiveUser = this.deActivateUsers.length <= 0;
    })
  }

  changeStatus(user){
    this.getAll.changeStatus(user).subscribe(data => {
      var result = data.json();
      if(result.success){
          this.message = 'User status has been changed';
          this.class   = 'success';
          this.title   = 'Success';
          this.popToast();
          this.ngOnInit();
      }
    })
  }

  editUser(data){
      var user = {
        user_email : data.email,
        user_id     : data._id,
        user_mobile : data.mobile
      }

    let dialogRef = this.dialog.open(EditUserComponentComponent, {
      width: '500px',
      data: user,
    });

    dialogRef.afterClosed().subscribe(result => {
      if(result){
        this.email  = result.user_email;
        this.id     = result.user_id;
        this.mobile = result.user_mobile;
        this.updateUser();
      }
    });
  }

  updateUser(){
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
        this.ngOnInit();
        return ;
      }
    });
  }

  deleteUser(data){
    const user = {
      _id : data._id,
    }
    this.editService.deleteUser(user).subscribe(data => {
      if(data.json().success === false || data.json().success === null){
        this.message = data.json().message;
        this.popToast();
        return false;
      }else{
        this.message = data.json().message;
        this.class   = 'success';
        this.title   = 'Success';
        this.popToast();
        this.ngOnInit();
        return ;
      }
    });
  }

  getuser(data){
    this.userData = data;
  }
}
