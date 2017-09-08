import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';

@Injectable()
export class GetAllUserService {

  constructor(private http: Http) { }

  getAllUser(){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:8080/user/getAll',{headers:headers});
  }

  changeStatus(user){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/user/changeStatus',user,{headers:headers});
  }
}
