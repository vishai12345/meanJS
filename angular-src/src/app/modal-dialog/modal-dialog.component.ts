import { Component, OnInit, Inject } from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-modal-dialog',
  templateUrl: './modal-dialog.component.html',
  styleUrls: ['./modal-dialog.component.css']
})
export class ModalDialogComponent implements OnInit {

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<ModalDialogComponent>
  ) { }

  ngOnInit() {
  }
}
