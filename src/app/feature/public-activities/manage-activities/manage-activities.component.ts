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

@Component({
  selector: 'app-manage-activities',
  templateUrl: './manage-activities.component.html',
  styleUrls: ['./manage-activities.component.scss']
})
export class ManageActivitiesComponent implements OnInit{
  activitiesList : ActivityNewDTO[];
  constructor(private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private volunteerService: VolunteerService,
              private activityService: ActivitiesService,
              private matSnackBar: MatSnackBar) {
  }
  ngOnInit(): void {
  }

  getAllActivities(){
    this.activityService.getAllActivities().subscribe((data)=>{
      this.activitiesList = data;
    },(error => {

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
        //this.getTrackingVolunters();
      }
    });
  }
}
