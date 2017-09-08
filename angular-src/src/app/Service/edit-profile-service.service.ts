import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';

@Injectable()
export class EditProfileServiceService {

  constructor(private http: Http) { }

  updateProfile(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/user/updateProfile',user,{headers:headers});
  }

  deleteUser(data){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/user/deleteUser',data,{headers:headers});
  }

  changePassword(data){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/user/change-password',data,{headers:headers});
  }

}
