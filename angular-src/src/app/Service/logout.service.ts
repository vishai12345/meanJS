import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';
import 'rxjs/add/operator/map';

@Injectable()
export class LogoutService {

  constructor(private http : Http) { }

  logout(){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:8080/auth/logout',{headers:headers});
  }
}
