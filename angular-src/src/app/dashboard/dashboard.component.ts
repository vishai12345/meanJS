import { Component, OnInit } from '@angular/core';
import { Router }  from '@angular/router';
import { LoginService } from '../Service/login.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { BookingService } from '../Service/booking.service';
import {MdDialog,MdDialogRef} from '@angular/material';
import { ModalDialogComponent } from '../modal-dialog/modal-dialog.component';
import { ViewBookingDialogComponent } from '../view-booking-dialog/view-booking-dialog.component';
import {PushNotificationsService} from 'angular2-notifications';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  bookingList:[{
    status:string;
    address:string,
    zipcode_id:string,
    booked_date:string,
    custom_description:string
  }];
  forAdmin :boolean = false;
  bookingStatus:number = 0;
  message:string;
  class:string = 'alert-danger';
  timeout:number = 5000;
  bookingId:string;
  constructor(
    private router: Router,
    private loginService:LoginService,
    private _flashMessagesService: FlashMessagesService,
    private bookingService : BookingService,
    public dialog: MdDialog,
    private _pushNotifications: PushNotificationsService
  ) { }

  ngOnInit() {
    var profile = this.loginService.getProfile().subscribe(data => {
      var user = data.json()
      if(user){
        if(user.user.user_type === 'Admin')
          this.forAdmin = true;
      }
      this.getBookinglist();
    })
  }

  openDialog(bookingID) {
    var data = {
      returnData : bookingID,
      title : 'Cancel Booking',
      body : 'Are you sure to cancel this booking ?',
      buttonText : 'Cancel Booking'
    }
    let dialogRef = this.dialog.open(ModalDialogComponent, {
      height: '230px',
      width: '500px',
      data: data,
    });

    dialogRef.afterClosed().subscribe(result => {
      this.onDelete(result);
    });
  }

  openViewDialog(data){
    var bookingData = {
      returnData : data,
      title : 'View Booking',
    }
    let dialogRef = this.dialog.open(ViewBookingDialogComponent, {
      width: '500px',
      data: bookingData,
    });

    dialogRef.afterClosed().subscribe(result => {

    });
  }

  getBookinglist(){
    var booking = {
      status : '1',
      address : 'address',
      zipcode_id : '5',
      user_id : '598371811ebcf32d28e25831',
      custom_description : 'custom_description',
    }

    // this.bookingService.submitBooking(booking).subscribe(data => {
    //   console.log(data.json());
    // })

    this.bookingService.getBookinglist(this.bookingStatus).subscribe(data => {
      this.bookingList = data.json().data;
    })
  }

  onDelete(bookingId){
    this.bookingService.cancelBooking(bookingId).subscribe(data => {
      if(data.json().success){
        this.message = data.json().message;
        this.class = 'alert-success';
        this.showNotification(this.message);
        this.ngOnInit();
      }
    })
  }

  showNotification(message){
    this._pushNotifications.requestPermission();
    this._pushNotifications.create('Booking', {body: message,icon :'https://www.unclefitter.com/web/img/uncle-fitter-logo.png'}).subscribe(
      res => console.log(),
      err => console.log(err)
    )
  }

  getBookingID(bookingId){
    this.bookingId = bookingId;
  }

  getBookingByStatus(status){
    this.bookingStatus = status;
    this.bookingService.getBookinglist(status).subscribe(data => {
      this.bookingList = data.json().data;
    })
  }

  flashMessage(){
    this._flashMessagesService.show(this.message, { cssClass: this.class, timeout: this.timeout });
  }
}
