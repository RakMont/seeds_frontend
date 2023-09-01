import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {FormBuilder, Validators} from "@angular/forms";
import {DialogData} from "../modal-process-seed/modal-process-seed.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplicantService} from "../../../core/services/applicant.service";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";

@Component({
  selector: 'app-modal-unactive-seed',
  templateUrl: './modal-unactive-seed.component.html',
  styleUrls: ['./modal-unactive-seed.component.scss']
})
export class ModalUnactiveSeedComponent  implements OnInit{
  applicantForm;
  sendingData = false;
  startDate = new Date();
  form = this.formBuilder.group({
    id:[''],
    deactivationDate: ['',Validators.required],
    deactivationReason: ['', Validators.required],
    reactivationDate: ['', Validators.required],
    contributorState: ['', Validators.required],
    contributorId:['', Validators.required]
  });
  constructor(public dialogRef: MatDialogRef<ModalUnactiveSeedComponent>,
              private formBuilder: FormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private matSnackBar: MatSnackBar,
              private applicantService: ApplicantService) {
  }


  ngOnInit(): void {
   this.form.patchValue({contributorId:this.data.contributorId})
  }

  onSubmit(): void {
    this.sendingData = true;
    this.applicantService.deactivateSeed(this.form.value)
      .subscribe((data) => {
        this.dialogRef.close('processed');
        this.showMessage(data);
      }, ( error ) => {
        this.dialogRef.close();
        this.showMessage(error.error);
      });
  }
  get deactivationReason(){
    return this.form.get('deactivationReason');
  }

  getErrorMessage(){
    return 'El campo es obligatorio'
  }
  showMessage(data: any): void{
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: { data },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
  }
}
