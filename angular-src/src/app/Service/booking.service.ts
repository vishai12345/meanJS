import { Injectable } from '@angular/core';
import { Http ,Headers} from '@angular/http';

@Injectable()
export class BookingService {

  constructor(private http: Http) { }

  getBookinglist(status){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:8080/booking/list/'+status,{headers:headers});
  }

  submitBooking(booking){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.post('http://localhost:8080/booking/book',booking,{headers:headers});
  }

  cancelBooking(bookingId){
    let headers = new Headers();
    headers.append('Content-type','application/json');
    return this.http.get('http://localhost:8080/booking/cancel/'+bookingId,{headers:headers});
  }
}
