import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {CellContent, Table} from "../../../core/models/Table.model";
import {Volunter} from "../../../core/models/Volunteer.model";
import {TrackingService} from "../../../core/services/tracking.service";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {AsignSeedVolunteerComponent} from "../manage-tracking/asign-seed-volunteer/asign-seed-volunteer.component";
import {ModalUniqueDonationComponent} from "../manage-donations/modal-unique-donation/modal-unique-donation.component";
import {ViewDonationComponent} from "../manage-donations/view-donation/view-donation.component";
import {ExportSheetComponent} from "../manage-donations/export-sheet/export-sheet.component";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ReportServiceService} from "../../../core/services/report-service.service";
export interface SelectSeed{
  seedId: string;
  trackingAssignmentId: string;
  contributionConfigId: string;
}
@Component({
  selector: 'app-list-tracking-seeds',
  templateUrl: './list-tracking-seeds.component.html',
  styleUrls: ['./list-tracking-seeds.component.scss']
})
export class ListTrackingSeedsComponent implements OnChanges, OnInit {
  @Input() volunterId: string = null;
  @Output() emitter: EventEmitter<{ tabAction }> = new EventEmitter();
  @Output() selectedSeed: EventEmitter<SelectSeed> = new EventEmitter();
  loadingTable = true;
  data: Table;
  index = 0;

  volunteer: Volunter;
  loadingVolunteer = true;
  constructor(private trackingService: TrackingService,
              private _bottomSheet: MatBottomSheet,
              private dialog: MatDialog,
              private volunteerService: VolunteerService,
              private contributionReportService: ReportServiceService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
    if(!this.volunterId){
      this.getVolunteerInfo();
      this.getLoggedVolunteerTrackingSeeds();
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getVolunteerInfo();
    this.getTrackingSeeds();

  }
  getTrackingSeeds(){
    if (this.volunterId){
      this.getTrackingVolunteers();
    }
  }
  getTrackingVolunteers(): void{
    this.loadingTable = true;
    this.trackingService.listTrackingSeeds(this.volunterId).subscribe(
      (data) => {
        this.data = data;
        this.loadingTable = false;
      }, (error) => {
        //this.showMessage(error.error);
      });
  }
  getLoggedVolunteerTrackingSeeds(): void{
    this.loadingTable = true;
    this.trackingService.listLoggedVolunteerTrackingSeeds().subscribe(
      (data) => {
        this.data = data;
        this.loadingTable = false;
      }, (error) => {
        //this.showMessage(error.error);
      });
  }
  actionOutput(evento: CellContent): void{
    console.log('event', evento);
    if (evento.clickedAction === 'Donations'){
      let out: SelectSeed = {
        seedId: evento.params[0].paramContent,
        trackingAssignmentId: evento.params[1].paramContent,
        contributionConfigId: evento.params[2].paramContent
      };
      this.selectedSeed.emit(out);
      // this.donations();
    } else if (evento.clickedAction === 'ViewUniqueDonation'){
      let out: SelectSeed = {
        seedId: evento.params[0].paramContent,
        trackingAssignmentId: evento.params[1].paramContent,
        contributionConfigId: evento.params[2].paramContent
      };
      this.openUniqueContributionModal(out);
    }
    else if (evento.clickedAction === 'UpdateRecord'){
      let out = {
        isUpdate:true,
        contributionRecordId: evento.params[0].paramContent}
      this.openUniqueContributionModal(out);
    }
    else if (evento.clickedAction === 'SeeRecord'){
      let out = {contributionRecordId: evento.params[0].paramContent
      }
      this.openViewContributionRecordModal(out);
    }
    else{
      console.log("evento",evento);
      this.openBottomSheet();
    }
  }
  openViewContributionRecordModal(out): void {
    const dialogConfig = this.dialog.open(ViewDonationComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        selectSeed: out,
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getLoggedVolunteerTrackingSeeds();
      }
    });
  }
  openUniqueContributionModal(out): void{
    const dialogConfig =  this.dialog.open(ModalUniqueDonationComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        selectSeed: out,
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result==='success'){
        this.getTrackingVolunteers();
      }
    });
  }
  back(): void{
    this.emitter.emit({tabAction: {number: 0}}) ;
  }

  donations(): void{
    this.index = 1;
  }
  onTabChanged(evento){
    console.log('event', evento);
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

  openAsignDialog(): void{
    const dialogConfig =  this.dialog.open(AsignSeedVolunteerComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        volunterId: this.volunterId,
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result==='success'){
        this.getTrackingVolunteers();
      }
    });
  }



  getVolunteerInfo(){
    this.volunteerService.getVolunteer(this.volunterId)
      .subscribe((data) =>{
        this.volunteer = data;
        this.loadingVolunteer = false;
      },(error => {
        this.loadingVolunteer = false;
      }))
  }

  openBottomSheet(): void {
    //const queryParams = this.filterForm.value
    this._bottomSheet.open(ExportSheetComponent).afterDismissed()
      .subscribe((dats) => {
        if (dats === 'PDF'){
          this.getReport();
          console.log('datos', dats);
          /*
          *const url = this.router.serializeUrl(
            this.router.createUrlTree(
              ['/admin/tracking/export-tracking'],
              { queryParams })
          );
          window.open(url, '_blank');
          * */
        }
      });
  }
  getReport(){
    this.contributionReportService.getContributionRecordsReport()
      .subscribe((data: Blob)=>{
        const file = new Blob([data], {type: 'application/pdf'});
        const fileURL = URL.createObjectURL(file);
        console.log('filename')
        //saveAs(data, 'contributionrecords.pdf')
        window.open(fileURL, '_blank', 'width=1000, height=800');


      },(error)=>{
        console.log("error",error);
      })
  }
}
