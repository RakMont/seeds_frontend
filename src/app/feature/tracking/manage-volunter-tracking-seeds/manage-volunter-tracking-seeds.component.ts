import {Component, OnChanges, OnInit} from '@angular/core';
import {CellContent, Table} from "../../../core/models/Table.model";
import {Volunter} from "../../../core/models/Volunteer.model";
import {TrackingService} from "../../../core/services/tracking.service";
import {MatDialog} from "@angular/material/dialog";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import { saveAs } from 'file-saver';
import {ModalUniqueDonationComponent} from "../manage-donations/modal-unique-donation/modal-unique-donation.component";
import {ViewDonationComponent} from "../manage-donations/view-donation/view-donation.component";
import {ExportSheetComponent} from "../manage-donations/export-sheet/export-sheet.component";
import {ReportServiceService} from "../../../core/services/report-service.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {ContributionReportFilter, ReportType} from "../../../core/models/ContributionRecord.model";

@Component({
  selector: 'app-manage-volunter-tracking-seeds',
  templateUrl: './manage-volunter-tracking-seeds.component.html',
  styleUrls: ['./manage-volunter-tracking-seeds.component.scss']
})
export class ManageVolunterTrackingSeedsComponent implements OnInit{
  loadingTable = true;
  data: Table;
  index = 0;

  volunteer: Volunter;
  loadingVolunteer = true;
  idSelectedSeeds: string;
  trackingAssignmentId: string;
  contributionConfigId: string;
  constructor(private trackingService: TrackingService,
              private dialog: MatDialog,
              private _bottomSheet: MatBottomSheet,
              private contributionReportService: ReportServiceService,
              private volunteerService: VolunteerService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
      this.getLoggedVolunteerTrackingSeeds();
      this.getVolunteerInfo();
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
        this.idSelectedSeeds = evento.params[0].paramContent,
        this.trackingAssignmentId = evento.params[1].paramContent,
        this.contributionConfigId = evento.params[2].paramContent
        this.index = 1;
    }
    else if (evento.clickedAction === 'ViewUniqueDonation'){
      let out = {
        seedId : evento.params[0].paramContent,
        trackingAssignmentId : evento.params[1].paramContent,
        contributionConfigId : evento.params[2].paramContent
      }
      this.openUniqueContributionModal(out);
    }
    else if (evento.clickedAction === 'UpdateRecord'){
      let out = {
        isUpdate:true,
        contributionRecordId: evento.params[0].paramContent}
      this.openUniqueContributionModal(out);
    }
    else if (evento.clickedAction === 'SeeRecord'){
      let out = {donationId: evento.params[0].paramContent
      }
      this.openViewContributionRecordModal(out);
    }else if (evento.clickedAction === 'downloadRecords'){
      const payload={
        beginDate: null,
        endDate: null,
        paymentMethod: null,
        contributionType: null,
        reportType: null,
        seedId:evento.params[0].paramContent}
      this.openBottomSheet(payload);
    }

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
        this.getLoggedVolunteerTrackingSeeds();
      }
    });
  }

  openViewContributionRecordModal(out): void {
    const dialogConfig = this.dialog.open(ViewDonationComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: out
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result === 'success') {
        this.getLoggedVolunteerTrackingSeeds();
      }
    });
  }
  onTabChanged(event){
    console.log('eventoonTabChanged', event)
    this.index=event.index;
    if (event.index === 0 ){
      this.getLoggedVolunteerTrackingSeeds();
    }
  }
  back(): void{
    this.index = 0;
  }
  /*selectedSeed(evento): void{
    console.log('selectedSeed', evento);
    this.idSelectedSeeds = evento.seedId;
    this.trackingAssignmentId = evento.trackingAssignmentId;
    this.contributionConfigId = evento.contributionConfigId;
    this.index = 2;
  }*/


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
          saveAs(data, 'seed_records.pdf');
          window.open(fileURL, '_blank', );
        }else if(payload.reportType === ReportType.SEED_RECORD_CSV){
          saveAs(data, 'seed_records.xlsx');
        }

      },(error)=>{
        console.log("error",error);
      })
  }

  getVolunteerInfo(){
    this.volunteerService.getVolunteer()
      .subscribe((data) =>{
        this.volunteer = data;
        this.loadingVolunteer = false;
      },(error => {
        this.loadingVolunteer = false;
      }))
  }
}
