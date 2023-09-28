import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {Role, Volunter} from "../../../core/models/Volunteer.model";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";

export interface DialogData {
  volunterId: string;
  edit: boolean;
}

@Component({
  selector: 'app-volunter-dialog',
  templateUrl: './volunter-dialog.component.html',
  styleUrls: ['./volunter-dialog.component.scss']
})
export class VolunterDialogComponent implements OnInit {
  volunteerForm = this.fb.group({
    userId: [null],
    name: ['', Validators.required],
    username: [null],
    password: [null],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    dni: ['', Validators.required],
    birthdate: ['', Validators.required],
    roles: null
  });
  hide = true;
  roles: Role[] = [];
  allRoles: Role[] = [];
  volunteer: Volunter = null;
  title: string;
  filteredRoles: Role[] = [];
  sendingData = false;
  constructor(public dialogRef: MatDialogRef<VolunterDialogComponent>,
              private volunteerService: VolunteerService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: UntypedFormBuilder,
              private matSnackBar: MatSnackBar
  ) { }

  ngOnInit(): void {
    this.getRoles();
    if (this.data.edit){
      this.getVolunteer();
    }
    this.getTitle();
  }
  getVolunteer(): void{
    this.volunteerService.getVolunteer(this.data.volunterId)
      .subscribe((response) => {
        this.volunteer = response;
        this.volunteerForm.patchValue({
          userId: this.volunteer.userId,
          name: this.volunteer.name,
          lastname: this.volunteer.lastname,
          email: this.volunteer.email,
          phone: this.volunteer.phone ? this.volunteer.phone : '',
          dni: this.volunteer.dni ? this.volunteer.dni : '',
          birthdate: new Date(this.volunteer.birthdate)
        });
        this.roles = this.volunteer.roles;
        this.filterRoles();
      });
  }
  close(): void {
    this.dialogRef.close();
  }
  getTitle(): void{
    this.title = this.data.edit ? 'EDITAR RESPONSABLE' : 'REGISTRAR RESPONSABLE';
  }

  onSubmit(): void{
    this.sendingData=true;
    if ( !this.data.edit ) {
      this.createVolunteer();
    }else {
      this.updateVolunteer();
    }
  }
  createVolunteer(){
    const data = {
      user: this.volunteerForm.value,
      entry_date: new Date(),
      roles: this.roles,
      username: this.volunteerForm.get('username').value,
      password: this.volunteerForm.get('password').value
    };
    this.volunteerService.addVolunteer(data)
      .subscribe(( data ) => {
        this.sendingData=false;
        this.showMessage(data);
        this.dialogRef.close('success');
      }, (error) => {
        this.sendingData=false;
        this.showMessage(error.error);
      });
  }
  updateVolunteer(){
      const data = {
        volunterId: this.volunteer.volunterId,
        user: this.volunteerForm.value,
        roles: this.roles,
        username: this.volunteerForm.get('username').value,
        password: this.volunteerForm.get('password').value
      };
      this.volunteerService.updateVolunteer(data)
        .subscribe(( data ) => {
          this.showMessage(data);
          this.sendingData=false;
          this.dialogRef.close('success');
        }, (error) => {
          this.sendingData=false;
          this.showMessage(error.error);
        });

  }
  getErrorMessage(): any {
    if (this.volunteerForm.get('name').hasError('required')) {
      return 'Debes Ingresar el nombre';
    }
  }
  getErrorMessageLastname(): any {
    if (this.volunteerForm.get('lastname').hasError('required')){
      return 'Debes Ingresar el apellido';
    }
  }
  getErrorMessageEmail(): any {
    if (this.volunteerForm.get('email').hasError('required')){
      return 'Debes Ingresar el Correo';
    }
    return this.email.hasError('email') ? 'Debes Ingresar un Correo valido' : '';
  }

  getErrorMessagePhone(): any {
    if (this.volunteerForm.get('phone').hasError('required')){
      return 'Debes Ingresar un Celular';
    }
  }
  getErrorMessageDNI(): any {
    if (this.volunteerForm.get('dni').hasError('required')){
      return 'Debes ingresar el Carnet de Identidad';
    }
  }
  get name(): any {
    return this.volunteerForm.get('name');
  }
  get lastname(): any {
    return this.volunteerForm.get('lastname');
  }
  get email(): any {
    return this.volunteerForm.get('email');
  }
  get phone(): any {
    return this.volunteerForm.get('phone');
  }
  get dni(): any {
    return this.volunteerForm.get('dni');
  }
  get confirmButton(): string{
    return this.data.edit ? 'GUARDAR EDICIÓN' : 'GUARDAR RESPONSABLE';
  }
  getRoles(): void{
    this.volunteerService.getAllRoles()
      .subscribe((value) => {
        this.allRoles = value;
        this.filteredRoles = value;
      });
  }
  remove(role): void{
    this.roles = this.roles.filter(r => r.roleId !== role.roleId);
    this.filteredRoles.push(role);
    console.log('r', role, this.roles);
  }

  selected(event): void {
    this.roles.push(event.option.value);
    const roleId = event.option.value.roleId;
    this.filteredRoles = this.filteredRoles.filter(r => r.roleId !== roleId);
  }
  filterRoles(): void{
    this.roles.map((role) => {
      this.filteredRoles = this.filteredRoles.filter(r => r.roleId !== role.roleId);
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

}
