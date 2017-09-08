import { Component, OnInit , Inject} from '@angular/core';
import {MD_DIALOG_DATA,MdDialogRef} from '@angular/material';

@Component({
  selector: 'app-edit-user-component',
  templateUrl: './edit-user-component.component.html',
  styleUrls: ['./edit-user-component.component.css']
})
export class EditUserComponentComponent implements OnInit {

  constructor(
    @Inject(MD_DIALOG_DATA) public data: any,
    public dialogRef: MdDialogRef<EditUserComponentComponent>
  ) { }

  ngOnInit() {
  }

}
