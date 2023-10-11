import {Component, OnInit} from '@angular/core';
import {CellContent, Table} from "../../../core/models/Table.model";
import {Volunter} from "../../../core/models/Volunteer.model";
import {MatDialog} from "@angular/material/dialog";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ReportServiceService} from "../../../core/services/report-service.service";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SouvenirViewComponent} from "../souvenir-view/souvenir-view.component";
import {ExitElementComponent} from "../../../shared/exit-element/exit-element.component";
import {SouvenirTrackingService} from "../../../core/services/souvenir-tracking.service";
import {TrackingStatus} from "../../../core/models/Souvenir.model";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-manage-souvenir-tracking',
  templateUrl: './manage-souvenir-tracking.component.html',
  styleUrls: ['./manage-souvenir-tracking.component.scss']
})
export class ManageSouvenirTrackingComponent implements OnInit{
  loadingTable = true;
  data: Table;
  index = 0;
  val = this.formBuilder.group({
    state: [TrackingStatus.SOUVENIR_PENDING]
  });
  volunteer: Volunter;
  loadingVolunteer = true;
  idSelectedSeeds: string;
  seedSouvenirTrackingId: string;
  contributionConfigId: string;
  isUpdate = false;
  previousState = TrackingStatus.SOUVENIR_PENDING;
  constructor(private souvenirTrackingService: SouvenirTrackingService,
              private dialog: MatDialog,
              private _bottomSheet: MatBottomSheet,
              private formBuilder: FormBuilder,
              private contributionReportService: ReportServiceService,
              private volunteerService: VolunteerService,
              private matSnackBar: MatSnackBar) {
  }
  ngOnInit(): void {
    this.filterValueChanges();
    this.getAllTrackingSouvenirs();
  }
  filterValueChanges(){
    this.val.get('state').valueChanges.subscribe((data)=>{
      if (data){
        if (this.previousState != data){
          this.getAllTrackingSouvenirs();
          this.previousState = data;
        }
      }else this.val.get('state').patchValue(this.previousState)
    })
  }
  getAllTrackingSouvenirs(): void{
    this.loadingTable = true;
    const filter= {
      trackingStatus:  this.val.get('state').value
    }
    this.souvenirTrackingService.getAll(filter).subscribe(
      (data) => {
        this.data = data;
        this.loadingTable = false;
      }, (error) => {
        this.loadingTable = false;

        //this.showMessage(error.error);
      });
  }

  actionOutput(event: CellContent): void{
    if (event.clickedAction === 'EditSouvenirTracking'){
      this.isUpdate=true;
      this.seedSouvenirTrackingId = event.params[0].paramContent;
      this.index = 1;
    }
    else if (event.clickedAction === 'ViewSouvenirTracking'){
      let out = {
        seedSouvenirTrackingId : event.params[0].paramContent,
      }
      this.viewSouvenirTrackingDetailModal(out);
    }
    else if (event.clickedAction === 'DeleteSouvenirTracking'){
      this.onDelete(event.params[0].paramContent);
    }
  }
  viewSouvenirTrackingDetailModal(out): void{
    const dialogConfig =  this.dialog.open(SouvenirViewComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        seedSouvenirTrackingId: out.seedSouvenirTrackingId,
      }
    });
  }

  onDelete(id): void{
    const dialogRef = this.dialog.open(ExitElementComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '500px',
      data: {
        isDelete: true,
        title: 'ELIMINAR REGISTRO DE APORTE',
        question: 'Al confirmar se eliminará el registro del aporte' +
          ' y ningun dato podra ser visible.' +
          ' ¿ Está seguro de eliminarlo ?'
      }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if(result?.status ==='afirmative'){
        this.deleteContribution(id);
      }
    })
  }

  deleteContribution(id){
    this.souvenirTrackingService.deleteSouvenirTracking(id).subscribe((data)=>{
      this.showMessage(data);
      this.getAllTrackingSouvenirs();
    },(error => {
      this.showMessage(error.error);
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

  onTabChanged(event){
    this.index=event.index;
    if (event.index === 0 ){
      this.getAllTrackingSouvenirs();
    }
  }

  back(): void{
    this.index = 0;
  }
  emitter(event){
    this.index = 0;
  }
  onAdding(){
    this.index = 1;
  }
}
