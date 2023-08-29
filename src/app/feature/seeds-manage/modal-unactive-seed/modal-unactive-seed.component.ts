import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {DialogData} from "../modal-process-seed/modal-process-seed.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplicantService} from "../../../core/services/applicant.service";

@Component({
  selector: 'app-modal-unactive-seed',
  templateUrl: './modal-unactive-seed.component.html',
  styleUrls: ['./modal-unactive-seed.component.scss']
})
export class ModalUnactiveSeedComponent  implements OnInit{
  applicantForm;
  sendingData = false;
  constructor(public dialogRef: MatDialogRef<ModalUnactiveSeedComponent>,
              private _formBuilder: FormBuilder,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private matSnackBar: MatSnackBar,
              private applicantService: ApplicantService) {
  }


  ngOnInit(): void {
  }


  onSubmit(): void {
    this.sendingData = true;

  }
}
