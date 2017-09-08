import { Component , OnInit} from '@angular/core';
import { LoginService } from './Service/login.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
})

export class AppComponent implements OnInit {
  title = 'app';
  constructor(private loginService:LoginService) {}

  ngOnInit() {
    var profile = this.loginService.getProfile().subscribe(data => {
      var user = data.json()
      if(!user){
        localStorage.removeItem('currentUser');
      }
    })
  }

}
