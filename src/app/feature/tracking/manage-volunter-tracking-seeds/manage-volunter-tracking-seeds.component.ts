import {Component, OnChanges, OnInit} from '@angular/core';
import {CellContent, Table} from "../../../core/models/Table.model";
import {Volunter} from "../../../core/models/Volunteer.model";
import {TrackingService} from "../../../core/services/tracking.service";
import {MatDialog} from "@angular/material/dialog";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SelectSeed} from "../list-tracking-seeds/list-tracking-seeds.component";
import {ModalUniqueDonationComponent} from "../manage-donations/modal-unique-donation/modal-unique-donation.component";
import {ViewDonationComponent} from "../manage-donations/view-donation/view-donation.component";

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
              private volunteerService: VolunteerService,
              private matSnackBar: MatSnackBar) {
  }

  ngOnInit(): void {
      this.getLoggedVolunteerTrackingSeeds();
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
    if (evento.clickedAction === 'Donations'){

        this.idSelectedSeeds = evento.params[0].paramContent,
        this.trackingAssignmentId = evento.params[1].paramContent,
        this.contributionConfigId = evento.params[2].paramContent
        this.index = 1;
      // this.donations();
    }
    else if (evento.clickedAction === 'ViewUniqueDonation'){
      let out = {
        idSelectedSeeds : evento.params[0].paramContent,
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
      let out = {contributionRecordId: evento.params[0].paramContent
      }
      this.openViewContributionRecordModal(out);
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
  onTabChanged(evento){
    console.log('eventoonTabChanged', evento)
    this.index=evento.index;
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
}
