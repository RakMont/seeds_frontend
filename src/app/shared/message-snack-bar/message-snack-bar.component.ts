import {Component, Inject, OnInit} from '@angular/core';
import {MAT_SNACK_BAR_DATA, MatSnackBarRef} from "@angular/material/snack-bar";
import {ResponseStatus} from "../../core/models/Utils.model";

@Component({
  selector: 'app-message-snack-bar',
  templateUrl: './message-snack-bar.component.html',
  styleUrls: ['./message-snack-bar.component.scss']
})
export class MessageSnackBarComponent implements OnInit {

  constructor(public sbRef: MatSnackBarRef<MessageSnackBarComponent>,
              @Inject(MAT_SNACK_BAR_DATA) public data: any) { }

  ngOnInit(): void {
    console.log('dialog', this.data);
  }

  get title(){
    switch (this.data.data.status){
      case ResponseStatus.ERROR: {
        return 'ERROR';
      }
      case ResponseStatus.SUCCESS: {
        return 'ÉXITO';
      }
      case ResponseStatus.WARNING: {
        return 'ADVERTENCIA';
      }
    }
  }
}
