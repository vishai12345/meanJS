import { Injectable } from '@angular/core';
import { Http,Headers } from '@angular/http';

@Injectable()
export class ValidatorService {

	constructor(private http: Http) {
		console.log('its running');
	}

	checkEmail(email){
    if(email === undefined || email === ''){
      return false;
    }
  }

	validateUserEmail(email){
		if(!this.validateEmail(email)){
      return false;
		}
	}

	validateUserPassword(password){
    if(password === undefined || password === ''){
      return false;
    }
  }
  validateUserMobile(mobile){
    if(mobile === undefined || mobile === ''){
      return false;
    }
  }

  validateEmail(email) {
    var re = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;
    return re.test(email);
  }

  validateToken(token){
    if(token === undefined || token === ''){
      return false;
    }
  }
}
