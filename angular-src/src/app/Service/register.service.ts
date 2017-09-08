import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class RegisterService {

  constructor(private http:Http) { }

  registerUser(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/auth/signup',user,{headers:headers});
  }
}
