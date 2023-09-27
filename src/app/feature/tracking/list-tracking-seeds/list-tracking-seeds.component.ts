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
import { saveAs } from 'file-saver';
import {ReportServiceService} from "../../../core/services/report-service.service";
import {ContributionReportFilter, ReportType} from "../../../core/models/ContributionRecord.model";
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
        this.loadingTable =false;
        //this.showMessage(error.error);
      });
  }
  actionOutput(event: CellContent): void{
    console.log('event', event);
    if (event.clickedAction === 'Donations'){
      let out: SelectSeed = {
        seedId: event.params[0].paramContent,
        trackingAssignmentId: event.params[1].paramContent,
        contributionConfigId: event.params[2].paramContent
      };
      this.selectedSeed.emit(out);
      // this.donations();
    } else if (event.clickedAction === 'ViewUniqueDonation'){
      let out: SelectSeed = {
        seedId: event.params[0].paramContent,
        trackingAssignmentId: event.params[1].paramContent,
        contributionConfigId: event.params[2].paramContent
      };
      this.openUniqueContributionModal(out);
    }
    else if (event.clickedAction === 'UpdateRecord'){
      let out = {
        isUpdate:true,
        contributionRecordId: event.params[0].paramContent}
      this.openUniqueContributionModal(out);
    }
    else if (event.clickedAction === 'SeeRecord'){
      let out = {contributionRecordId: event.params[0].paramContent
      }
      this.openViewContributionRecordModal(out);
    }
    else if(event.clickedAction === 'downloadRecords'){
      const payload={
        beginDate: null,
        endDate: null,
        paymentMethod: null,
        contributionType: null,
        reportType: null,
        seedId:event.params[0].paramContent}
      this.openBottomSheet(payload);
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

  openBottomSheet(payload: ContributionReportFilter): void {
    this._bottomSheet.open(ExportSheetComponent).afterDismissed()
      .subscribe((dats) => {
        if (dats === 'PDF'){
          payload.reportType = ReportType.SEED_RECORD_PDF
          this.getReport(payload);
        }else if (dats === 'EXCEL'){
          payload.reportType = ReportType.SEED_RECORD_CSV
          this.getReport(payload);
        }
      });
  }
  getReport(payload: ContributionReportFilter){
    this.contributionReportService.getContributionRecordsReport(payload)
      .subscribe((data: Blob)=>{
        const file = new Blob([data], {type: 'application/pdf'});
        if (payload.reportType === ReportType.SEED_RECORD_PDF){
          const fileURL = URL.createObjectURL(file);
          //saveAs(data, 'seed_records.pdf');
          window.open(fileURL, '_blank', );
        }else if(payload.reportType === ReportType.SEED_RECORD_CSV){
          saveAs(data, 'seed_records.xlsx');
        }
      },(error)=>{
        console.log("error",error);
      })
  }
}
