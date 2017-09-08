import { Component, OnInit,Inject } from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-view-booking-dialog',
  templateUrl: './view-booking-dialog.component.html',
  styleUrls: ['./view-booking-dialog.component.css']
})
export class ViewBookingDialogComponent implements OnInit {

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<ViewBookingDialogComponent>
  ) { }

  ngOnInit() {
  }

}
