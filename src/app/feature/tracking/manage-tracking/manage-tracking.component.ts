import {Component, OnInit} from '@angular/core';
import {CellContent, Table} from "../../../core/models/Table.model";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {MatDialog} from "@angular/material/dialog";
import {AsignSeedVolunteerComponent} from "./asign-seed-volunteer/asign-seed-volunteer.component";
import {FormBuilder} from "@angular/forms";

@Component({
  selector: 'app-manage-tracking',
  templateUrl: './manage-tracking.component.html',
  styleUrls: ['./manage-tracking.component.scss']
})
export class ManageTrackingComponent implements OnInit {
  index = 0;
  loadingtable = true;
  val = this.formBuilder.group({
    state: [null]
  });
  data: Table;
  idSelectedVolunter: string;
  idSelectedSeeds: string;
  trackingAssignmentId: string;
  contributionConfigId: string;
  constructor(private volunterService: VolunteerService,
              private formBuilder: FormBuilder,
              private dialog: MatDialog,) { }

  ngOnInit(): void {
    this.getTrackingVolunters();
  }
  getTrackingVolunters(): void{
    this.loadingtable = true;
    this.volunterService.listTrackingVolunteers().subscribe(
      (data) => {
        this.data = data;
        this.loadingtable = false;
      }
    );
  }

  actionOutput(event: CellContent): void{
    console.log('event', event);
    this.idSelectedVolunter = event.params[0].paramContent;
    if (event.clickedAction === 'ViewAssignedSeeds'){
      this.index = 1;
    }else if (event.clickedAction === 'AssignSeed'){
      this.openAssinDialog(this.idSelectedVolunter);
    }
  }
  onTabChanged(evento){}

  openAssinDialog(id): void{
    const dialogConfig =  this.dialog.open(AsignSeedVolunteerComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        volunterId: id,
        //isReject: false
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result){
        this.getTrackingVolunters();
      }
    });
  }

  selectedSeed(evento): void{
    console.log('selectedSeed', evento);
    this.idSelectedSeeds = evento.seedId;
    this.trackingAssignmentId = evento.trackingAssignmentId;
    this.contributionConfigId = evento.contributionConfigId;
    this.index = 2;
  }
  back(evento): void{
    console.log('evento', evento);
    this.index = evento.tabAction.number;
  }
}
