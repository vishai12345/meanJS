import { Component, OnInit, ElementRef, Input } from '@angular/core';
import { LoginService } from '../Service/login.service';
import { Router }  from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';
import {  FileUploader } from 'ng2-file-upload/ng2-file-upload';
import { Http, Response } from '@angular/http';
import "rxjs/add/operator/do";
import "rxjs/add/operator/map";

const URL = 'http://localhost:8080/user/photo';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  providers: [NavbarComponent]
})
export class ProfileComponent implements OnInit {

  public uploader:FileUploader = new FileUploader({url: URL, itemAlias: 'photo'});
  constructor(
    private loginService:LoginService,
    private router: Router,
    private otherComponent: NavbarComponent,
    private http: Http, private el: ElementRef
  ) { }
  id:string;
  email:string;
  mobile:string;
  usertype:string;
  img_src:string = '/assets/uploads/img_avatar2.png';

  ngOnInit() {
    this.fetchUser();

    this.uploader.onAfterAddingFile = (file)=> {
      file.withCredentials = false;
      var myReader:FileReader = new FileReader();
      myReader.onloadend = (e) => {
        this.img_src = myReader.result;
      }
      myReader.readAsDataURL(file._file);
    };
    this.uploader.onCompleteItem = (item:any, response:any, status:any, headers:any) => {
      alert('Image Uploaded Successfully');
    };
  }

  fetchUser(){
    this.loginService.getProfile().subscribe(data => {
        var user = data.json()
        this.id = user.user._id;
        this.email = user.user.email;
        this.mobile = user.user.mobile;
        this.usertype = user.user.user_type;
        this.img_src  = '/assets/uploads/'+user.user.imageURL;
        this.otherComponent.changeUserStatus();
    })
  }

  upload() {
    let inputEl: HTMLInputElement = this.el.nativeElement.querySelector('#photo');
    let fileCount: number = inputEl.files.length;
    let formData = new FormData();
    if (fileCount > 0) {
      formData.append('photo', inputEl.files.item(0));
      this.loginService.uploadPhoto(formData).subscribe();
    }
  }
}
