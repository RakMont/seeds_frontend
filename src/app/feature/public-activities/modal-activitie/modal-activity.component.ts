import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {FormArray, UntypedFormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivityNewDTO, TranslateLen} from "../../../core/models/Activity.model";
import {ActivitiesService} from "../../../core/services/activities.service";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {FireStorageService} from "../../../core/services/fire-storage.service";

import { AngularFireStorage } from "@angular/fire/compat/storage"


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
    registerDate: null,
    setTranslate: false,
    translateList: this.fb.array([])

  });
  image;
  firebaseFile;
  sendingData = false;
  activity: ActivityNewDTO;
  loadedImage = false;
  constructor(private volunteerService: VolunteerService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private fb: UntypedFormBuilder,
              private activityService: ActivitiesService,
              public dialogRef: MatDialogRef<ModalActivityComponent>,
              private matSnackBar: MatSnackBar,
              private fireStorage:AngularFireStorage,
              private storageService: FireStorageService
  ) { }
  ngOnInit(): void {
    console.log("ngoninit", this.data)
    if(this.data.isUpdate) this.getActivity();
    //this.addComment();
  }
  get translateList() {
    return this.activityForm.controls["translateList"] as FormArray;
  }
  getActivity(){
    this.activityService.getActivityById(this.data.activityId)
      .subscribe((data)=>{
        this.activity = data;
        this.activityForm.patchValue({
          activityId: this.activity.activityId,
          title: this.activity.title,
          description: this.activity.description,
          len: this.activity.len,
          imageLink: this.activity.imageLink,
          registerDate: this.activity.registerDate,
          setTranslate: this.activity.translateList.length > 0
        })
        this.activity.translateList.forEach(ac => {
          this.addComment(ac);
        })
      })
  }
  cargarImagen(event: any) {
    /*let archivos = event.target.files;
      let reader = new FileReader();
      let nombre = "fireimg"
      reader.readAsDataURL(archivos[0]);
      reader.onloadend = () => {
        this.loadedImage = true;
        console.log(reader.result);
        this.imagenes.push(reader.result);
        this.storageService.uploadImage(nombre + "_" + Date.now(), reader.result).then(urlImg =>{
          console.log(urlImg)
        })
*/
    }

   onFileChange(event:any){
    const file = event.target.files[0]
     this.firebaseFile = file;
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      this.loadedImage = true;
      this.image = reader.result;
    }
  }

  async sendingImageToFireBase(){
    try {
      const filename = "activity" + Date.now();
      const path = `activities/${filename}`
      const uploadTask =await this.fireStorage.upload(path,this.firebaseFile)
      return await uploadTask.ref.getDownloadURL()
    }
    catch (err){
      return null;

    }
  }
  sendData(){
    this.sendingData = true;
    if(this.data.isUpdate){
      this.updateActivity();
    }
    else{
      this.saveNewActivity();
    }
  }
  updateActivity(){
    this.sendingImageToFireBase().then(url =>{
      //console.log("url", url)
      this.activityForm.get('imageLink').setValue(url);
      this.activityService.updateActivity(this.activityForm.value)
        .subscribe((res) => {
          this.showMessage(res);
          this.sendingData = false;
          this.dialogRef.close('success');
        },(error => {
          this.showMessage(error.error);
          this.sendingData = false;
          this.dialogRef.close();
        }))
    })
  }
  saveNewActivity(){
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

  addComment(comment?) {
    const lessonForm = this.fb.group({
      activityId: [comment ? comment.activityId : null],
      title: [comment ? comment.title : null],
      description: [comment ? comment.description : null],
      len: [TranslateLen.ENGLISH],
    });
    this.translateList.push(lessonForm);
  }
  deleteComment(lessonIndex: number) {
    this.translateList.removeAt(lessonIndex);
  }
}
