import {Component, OnInit} from '@angular/core';
import {SouvenirTrackingService} from "../../../core/services/souvenir-tracking.service";
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {FormBuilder} from "@angular/forms";
import {ReportServiceService} from "../../../core/services/report-service.service";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {
  AsignSeedVolunteerComponent
} from "../../tracking/manage-tracking/asign-seed-volunteer/asign-seed-volunteer.component";
import {ModalActivityComponent} from "../modal-activitie/modal-activity.component";
import {ActivitiesService} from "../../../core/services/activities.service";
import {ActivityNewDTO} from "../../../core/models/Activity.model";
import {ActivatedRoute} from "@angular/router";
import {ExitElementComponent} from "../../../shared/exit-element/exit-element.component";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {VolunterDialogComponent} from "../../volunteer-manage/volunter-dialog/volunter-dialog.component";
import {ModalViewActivitieComponent} from "../modal-view-activitie/modal-view-activitie.component";

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.scss']
})
export class ManageActivitiesComponent implements OnInit{
  activitiesList : ActivityNewDTO[];
  loadingActivities = true;
  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private volunteerService: VolunteerService,
              private activityService: ActivitiesService,
              private activatedRoute: ActivatedRoute,
              private matSnackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.getAllActivities();
    this.activatedRoute.data.subscribe((data) => {
      const any = data;
      console.log(any);
    });
  }

  getAllActivities(){
    this.loadingActivities=true;
    this.activityService.getAllActivities().subscribe((data)=>{
      this.activitiesList = data;
      this.loadingActivities=false;

    },(error => {
      this.loadingActivities=false;

    }))
  }
  onAdding(){
    const dialogConfig =  this.dialog.open(ModalActivityComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        //volunterId: id,
        //isReject: false
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result){
        this.getAllActivities();
      }
    });
  }

  deleteActivity(activityId:string){
    const dialogRef = this.dialog.open(ExitElementComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '500px',
      data: {
        isDelete: true,
        title: 'ELIMINAR ACTIVIDAD',
        question: 'Al confirmar se eliminará la actividad de manera permanente. ' +
          ' ¿ Está seguro de eliminarla ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.status === 'afirmative'){
        this.activityService.deleteActivity(activityId)
          .subscribe(( res ) => {
            this.showMessage(res);
            if (res) { this.getAllActivities(); }
          }, ( error ) => {
            this.showMessage(error.error);
          });
      }
    });
  }
  updateActivity(activityId:string){
    const dialogRef = this.dialog.open(ModalActivityComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        activityId: activityId,
        isUpdate: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.getAllActivities(); }
    });
  }

  viewDetails(activityId:string){
    const dialogRef = this.dialog.open(ModalViewActivitieComponent,
      {
        disableClose: false,
        autoFocus:true,
        panelClass: 'icon-outside',
        width:'800px',
        data:{
          activityId: activityId,
        }
      })
  }

  chosenAction(event){
    console.log(event)
    if(event.action === 'updateActivity'){
      this.updateActivity(event.activityId)
    }
    else if(event.action === 'deleteActivity'){
      this.deleteActivity(event.activityId)
    }
    else if(event.action === 'viewDetails'){
      this.viewDetails(event.activityId)
    }
  }

  showMessage(data: any): void{
    console.log('showMessage', data);
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: { data },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
  }
}
