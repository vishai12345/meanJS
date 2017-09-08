import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LoginService {
  authToken:any;
  user:any;
  constructor(private http:Http) { }

  loginUser(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/auth/login',user,{headers:headers});
  }

  getProfile(){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:8080/user/profile',{headers:headers});
  }

  isLoggedIn(){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:8080//auth/isLoogedIn',{headers:headers});
  }

  uploadPhoto(photo){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/user/photo',photo,{headers:headers});
  }
}
