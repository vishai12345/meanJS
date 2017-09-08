import { Component, OnInit } from '@angular/core';
import { LogoutService } from '../Service/logout.service';
import { LoginService } from '../Service/login.service';
import { Router }  from '@angular/router';
import { ChatRoomService }       from '../Service/chat-room.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  logout:boolean = true;
  status:boolean = false;
  userType:boolean = true;
  constructor(
    private logoutService : LogoutService,
    private loginService :LoginService,
    private router: Router,
    private chatService:ChatRoomService
  ) {}

  ngOnInit() {
    var user = JSON.parse(localStorage.getItem('currentUser'));
      if(user != null || user != undefined){
        if(user.user_type === 'User'){
          this.userType = false;
        }else if(user.user_type === 'Admin'){
          this.userType = true;
        }
      }else{
        this.status = true;
      }
      this.changeUserStatus();
  }

  changeUserStatus(){
      this.logout = this.status;
  }

  userLogout(){
    localStorage.removeItem('currentUser');
    var user = JSON.parse(localStorage.getItem('chatName'));
    this.chatService.removeUserName(user.name);
    localStorage.removeItem('chatName');
    localStorage.removeItem('globalMessageBox');
    var userOut = this.logoutService.logout().subscribe(data => {
      var newdata = data.json()
      if(newdata){
        this.status = true;
        this.changeUserStatus();
        this.router.navigate(['/signup']);
      }
    })
  }

}
