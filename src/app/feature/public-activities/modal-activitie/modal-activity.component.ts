import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {TranslateLen} from "../../../core/models/Activity.model";
import {ActivitiesService} from "../../../core/services/activities.service";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";


export interface DialogData {
  activityId: string;
  isUpdate: boolean;
}
@Component({
  selector: 'app-modal-activitie',
  templateUrl: './modal-activity.component.html',
  styleUrls: ['./modal-activity.component.scss']
})
export class ModalActivityComponent implements OnInit{
  activityForm = this.fb.group({
    activityId: [null],
    title: ['', Validators.required],
    description: [null],
    len: [TranslateLen.SPANISH],
    imageLink: [null],
  });
  imagenes: any[] = [];
  sendingData = false;
  constructor(private volunteerService: VolunteerService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: UntypedFormBuilder,
              private activityService: ActivitiesService,
              public dialogRef: MatDialogRef<ModalActivityComponent>,
              private matSnackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
  }

  cargarImagen(event: any) {
    let archivos = event.target.files;
    let nombre = "jonathan";

    for (let i = 0; i < archivos.length; i++) {

      let reader = new FileReader();
      reader.readAsDataURL(archivos[0]);
      reader.onloadend = () => {
        console.log(reader.result);
        this.imagenes.push(reader.result);
        /*this.storageService.subirImagen(nombre + "_" + Date.now(), reader.result).then(urlImagen => {
          let usuario = {
            name: "jonathan",
            nickName: "yonykikok",
            password: "401325",
            imgProfile: urlImagen
          }
          console.log(urlImagen);
        });*/
      }
    }




  }

  sendData(){
    this.sendingData = true;
    this.activityService.createActivity(this.activityForm.value)
      .subscribe((res) => {
        this.showMessage(res);
        this.sendingData = false;
        this.dialogRef.close('success');
      },(error => {
        this.showMessage(error.error);
        this.sendingData = false;
        this.dialogRef.close();
      }))
  }

  showMessage(data: any): void{
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: { data },
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
  }
}
