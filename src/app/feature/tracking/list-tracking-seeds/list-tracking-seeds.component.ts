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
  loadingtable = true;
  data: Table;
  index = 0;

  volunteer: Volunter;
  loadingVolunteer = true;
  constructor(private trackingService: TrackingService,
              private dialog: MatDialog,
              private volunteerService: VolunteerService,
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
    this.loadingtable = true;
    this.trackingService.listTrackingSeeds(this.volunterId).subscribe(
      (data) => {
        this.data = data;
        this.loadingtable = false;
      }, (error) => {
        //this.showMessage(error.error);
      });
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
    const out: SelectSeed = {
      seedId: evento.params[0].paramContent,
      trackingAssignmentId: evento.params[1].paramContent,
      contributionConfigId: evento.params[2].paramContent
    };
    if (evento.clickedAction === 'Donations'){

      this.selectedSeed.emit(out);
      // this.donations();
    } else if (evento.clickedAction === 'ViewUniqueDonation'){
      this.openUniqueContributionModal(out);
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
}
