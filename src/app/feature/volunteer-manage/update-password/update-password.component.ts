import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {FormGroup, UntypedFormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DialogData} from "../volunter-dialog/volunter-dialog.component";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {Volunter} from "../../../core/models/Volunteer.model";

@Component({
  selector: 'app-update-password',
  templateUrl: './update-password.component.html',
  styleUrls: ['./update-password.component.scss']
})
export class UpdatePasswordComponent  implements OnInit{
  volunteer: Volunter = null;
  obtainedVolunteer = false;
  hide = true;
  sendingData = false;
  volunteerForm = this.fb.group({
    updatedVolunteerId:[null],
    updatedVolunteerPassword: ['', [Validators.required]],
    updatedVolunteerPasswordConfirmed: ['', [Validators.required]]
  }, {
    validators: this.password.bind(this)
  })


  constructor(public dialogRef: MatDialogRef<UpdatePasswordComponent>,
              private volunteerService: VolunteerService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: UntypedFormBuilder,
              private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getVolunteer();
  }

  getVolunteer(): void{
    this.volunteerService.getVolunteer(this.data.volunterId)
      .subscribe((response) => {
        this.volunteer = response;
        this.volunteerForm.patchValue({
          name: this.volunteer.name,
          lastname: this.volunteer.lastname,
          email: this.volunteer.email,
          phone: this.volunteer.phone ? this.volunteer.phone : '',
          dni: this.volunteer.dni ? this.volunteer.dni : '',
          birthdate: new Date(this.volunteer.birthdate)
        });
      });
  }
  onSubmit(): void{
    const data = this.volunteerForm.value
    data.updatedVolunteerId=this.data.volunterId;
    this.volunteerService.updateVolunteerPassword(data).subscribe(( data ) => {
      this.showMessage(data);
      this.dialogRef.close('success');
      }, (error) => {
        this.showMessage(error.error);
    });

  }
  showMessage(data: any): void{
    console.log('errormessage', data);
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: { data },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
  }

  get updatedVolunteerPassword(): any {
    return this.volunteerForm.get('updatedVolunteerPassword');
  }

  getErrorMessagePassword(): any {
    if (this.volunteerForm.get('updatedVolunteerPassword').hasError('required')){
      return 'Debes ingresar una contreseña';
    }
  }

  get updatedVolunteerPasswordConfirmed(): any {
    return this.volunteerForm.get('updatedVolunteerPasswordConfirmed');
  }

  getErrorMessagePasswordConfirmed(): any {
    if (this.volunteerForm.get('updatedVolunteerPasswordConfirmed').hasError('required')){
      return 'Debes confirmar la contraseña';
    }
  }

  password(formGroup: FormGroup) {
    const { value: password } = formGroup.get('updatedVolunteerPassword');
    const { value: confirmPassword } = formGroup.get('updatedVolunteerPasswordConfirmed');
    return password === confirmPassword ? null : { passwordNotMatch: true };
  }
}
