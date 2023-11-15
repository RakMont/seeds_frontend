import {Component, Inject, OnInit} from '@angular/core';
import {map, Observable, startWith} from "rxjs";
import { BoxSeed } from 'src/app/core/models/Seed.model';
import {Volunter} from "../../../../core/models/Volunteer.model";
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {TrackingService} from "../../../../core/services/tracking.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VolunteerService} from "../../../../core/services/volunteer.service";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatOptionSelectionChange} from "@angular/material/core";
import {MessageSnackBarComponent} from "../../../../shared/message-snack-bar/message-snack-bar.component";
import {ApplicantService} from "../../../../core/services/applicant.service";
import {BoxVolunteer} from "../../../../core/models/Souvenir.model";

export interface DialogData {
  trackingAssignmentId?: string;
  seedId: string
}
@Component({
  selector: 'app-asign-seed-volunteer',
  templateUrl: './asign-seed-volunteer.component.html',
  styleUrls: ['./asign-seed-volunteer.component.scss']
})
export class AsignSeedVolunteerComponent implements OnInit {
  seed: Volunter = null;
  sendingData = false;
  allTrackingVolunteers: BoxVolunteer[] = [];
  filteredSeeds: Observable<BoxVolunteer[]>;
  loadingAll = true;
  startDate = new Date();
  assignForm = this.form.group({
    searchValue: [],
    contributor_id: [null, Validators.required],
    volunter_id: [null, Validators.required],
    start_date: [null, Validators.required],
    end_date: [null, Validators.required]
  });
  constructor(
    public dialogRef: MatDialogRef<AsignSeedVolunteerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private trackingService: TrackingService,
    private volunteerService: VolunteerService,
    private applicantService: ApplicantService,
    private matSnackBar: MatSnackBar,
    private form: UntypedFormBuilder) { }

  ngOnInit(): void {
    this.getTrackingVolunteers();
    this.getSeedById();
  }
  getTrackingVolunteers(): void{
    this.volunteerService.getComboTrackingVolunteers()
      .subscribe((data) => {
        this.allTrackingVolunteers = data;
        this.loadingAll = false;
        this.filteredSeeds = this.assignForm.get('searchValue').valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }, (error) => {
        this.loadingAll = false;
      });
  }
  selected(evento: MatAutocompleteSelectedEvent){
    this.assignForm.get('volunter_id').setValue(evento.option.value.volunter_id);
    console.log('selected', evento);
  }
  updateMySelection(evento: MatOptionSelectionChange): void{
    this.assignForm.patchValue({
      searchValue: evento.source.value.largename
    });
  }
  private _filter(value: string): BoxVolunteer[] {
    if (typeof  value === 'string'){
      const filterValue = value.toLowerCase();
      return this.allTrackingVolunteers.filter(option =>
        option.largename.toLowerCase().includes(filterValue) ||
        option.dni.toLowerCase().includes(filterValue) ||
        option.email.toLowerCase().includes(filterValue)
      );
    }
  }

  confirm(){
    this.sendingData = true;
    const form = this.assignForm.value;
    if (this.data.trackingAssignmentId)form.tracking_assignment_id = this.data.trackingAssignmentId;
    this.trackingService.saveTrackingAssign(form)
      .subscribe((data) => {
        this.showMessage(data);
        this.sendingData =false;
        this.dialogRef.close('success');
      },(error => {
        this.sendingData =false;
        this.showMessage(error.error);
      }));
  }

  getSeedById(): void{
    this.applicantService.getSeedById(this.data.seedId)
      .subscribe((data) => {
        this.seed = data ;
        this.assignForm.get('contributor_id').setValue(this.data.seedId);
      });
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
}
