import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
export interface DialogData {
  isDelete: boolean;
  title: string;
  question: string;
}

@Component({
  selector: 'app-exit-element',
  templateUrl: './exit-element.component.html',
  styleUrls: ['./exit-element.component.scss']
})
export class ExitElementComponent implements OnInit {
  form = this.formBuilder.group({
    comment: [null]
  });
  constructor(public dialogRef: MatDialogRef<ExitElementComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

  ngOnInit(): void {
  }

  onSure(): void{
    this.dialogRef.close({
      status: 'afirmative',
      message: this.form.get('comment').value
    });
  }
  close(): void{
    this.dialogRef.close();
  }
}
