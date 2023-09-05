import {Component, OnChanges, OnInit} from '@angular/core';
import {CellContent, Table} from "../../../core/models/Table.model";
import {Volunter} from "../../../core/models/Volunteer.model";
import {TrackingService} from "../../../core/services/tracking.service";
import {MatDialog} from "@angular/material/dialog";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {SelectSeed} from "../list-tracking-seeds/list-tracking-seeds.component";

@Component({
  selector: 'app-manage-volunter-tracking-seeds',
  templateUrl: './manage-volunter-tracking-seeds.component.html',
  styleUrls: ['./manage-volunter-tracking-seeds.component.scss']
})
export class ManageVolunterTrackingSeedsComponent implements OnInit{
  loadingtable = true;
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
    this.loadingtable = true;
    this.trackingService.listLoggedVolunteerTrackingSeeds().subscribe(
      (data) => {
        this.data = data;
        this.loadingtable = false;
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
      // this.donations();
    }
  }

  onTabChanged(evento){
    console.log('eventoonTabChanged', evento)
    this.index=evento.index;
  }
  back(evento): void{
    console.log('evento', evento);
    this.index = evento.tabAction.number;
  }
  /*selectedSeed(evento): void{
    console.log('selectedSeed', evento);
    this.idSelectedSeeds = evento.seedId;
    this.trackingAssignmentId = evento.trackingAssignmentId;
    this.contributionConfigId = evento.contributionConfigId;
    this.index = 2;
  }*/
}
