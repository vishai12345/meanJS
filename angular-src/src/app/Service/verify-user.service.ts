import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class VerifyUserService {

  constructor(private http:Http) { }

  verifyToken(data){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/user/verify',data,{headers:headers});
  }
}
