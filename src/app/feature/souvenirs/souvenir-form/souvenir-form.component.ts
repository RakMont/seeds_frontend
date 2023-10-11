import {Component, EventEmitter, Inject, Input, OnInit, Output, ViewChild} from '@angular/core';
import {VolunteerService} from "../../../core/services/volunteer.service";
import {FormArray, UntypedFormBuilder, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {BoxVolunteer, SeedSouvenirTracking, TrackingStatus} from "../../../core/models/Souvenir.model";
import {BoxSeed} from "../../../core/models/Seed.model";
import {TrackingService} from "../../../core/services/tracking.service";
import {SouvenirTrackingService} from "../../../core/services/souvenir-tracking.service";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";

@Component({
  selector: 'app-souvenir-form',
  templateUrl: './souvenir-form.component.html',
  styleUrls: ['./souvenir-form.component.scss']
})
export class SouvenirFormComponent implements OnInit{
  @Output() emitter: EventEmitter<{ tabAction }> = new EventEmitter();
  @Input() isUpdate: boolean;
  @Input() seedSouvenirTrackingId?: string;
  panelOpenStateSeeds = true;
  selectedSeed: BoxSeed = null;
  allSeeds: BoxSeed[] = [];
  loadingSeeds = true;

  selectedVolunteer: BoxVolunteer = null;
  allSouvenirVolunteers: BoxVolunteer[] = [];
  panelOpenStateVolunteers = false;
  loadingVolunteers = true;

  canSendButton = false;
  sendingValues = false;
  trackingStatus = []
  loadingSouvenirTracking = false;
  seedSouvenirTracking: SeedSouvenirTracking = null;
  form = this.fb.group({
    seedSouvenirTrackingId: [null],
    benefitedContributorId: ['', Validators.required],
    volunteerInChargeId: ['', Validators.required],
    souvenirSendDate: ['', Validators.required],
    trackingStatus: [TrackingStatus.SOUVENIR_PENDING, Validators.required],
    chosenCity: ['', [Validators.required]],
    observation: [''],
    selectedDate: [],
    spentAmount:['',Validators.required],
    souvenirTrackingComments: this.fb.array([])
  });

  constructor(private volunteerService: VolunteerService,
              private trackingService: TrackingService,
              private souvenirTrackingService: SouvenirTrackingService,
              private fb: UntypedFormBuilder,
              private matSnackBar: MatSnackBar
  ) { }
  ngOnInit(): void {
    this.getAllSeedsCombo();
    this.getAllSouvenirVolunteers();
    this.setSouvenirTrackingStatus();
   if(this.isUpdate){
     this.getSouvenirTracking();

   }
  }
  get souvenirTrackingComments() {
    return this.form.controls["souvenirTrackingComments"] as FormArray;
  }

  addComment(comment?) {
    const lessonForm = this.fb.group({
      commentId: [comment ? comment.commentId : null],
      comment_date: [comment ? comment.comment_date : new Date(), Validators.required],
      comment: [comment ? comment.comment : '', Validators.required]
    });
    this.souvenirTrackingComments.push(lessonForm);
  }
  deleteComment(lessonIndex: number) {
    this.souvenirTrackingComments.removeAt(lessonIndex);
  }
  getSouvenirTracking(){
    this.loadingSouvenirTracking = true;
    this.souvenirTrackingService.getSeedSouvenirTracking(this.seedSouvenirTrackingId)
      .subscribe((data: SeedSouvenirTracking)=>{
        this.seedSouvenirTracking = data;
        this.loadingSouvenirTracking = false;
        this.selectedSeed = this.seedSouvenirTracking.benefitedContributorLabel;
        this.selectedVolunteer = this.seedSouvenirTracking.volunteerInChargeLabel;
        this.form.patchValue({
          seedSouvenirTrackingId: this.seedSouvenirTracking.seedSouvenirTrackingId,
          benefitedContributorId:this.seedSouvenirTracking.benefitedContributorId,
          volunteerInChargeId: this.seedSouvenirTracking.volunteerInChargeId,
          souvenirSendDate: this.seedSouvenirTracking.souvenirSendDate,
          trackingStatus: this.seedSouvenirTracking.trackingStatus,
          chosenCity: this.seedSouvenirTracking.chosenCity,
          observation: this.seedSouvenirTracking.observation,
          spentAmount: this.seedSouvenirTracking.spentAmount,
          selectedDate: this.seedSouvenirTracking.selectedDate
        })
        this.seedSouvenirTracking.souvenirTrackingComments.forEach(com=>{
          this.addComment(com);
        })
        this.panelOpenStateSeeds = false;
        this.panelOpenStateVolunteers = false;
      },(error => {
        this.loadingSouvenirTracking = false;
      }))

  }
  getAllSouvenirVolunteers(): void{
    this.volunteerService.getComboTrackingVolunteers()
      .subscribe((data) => {
        this.allSouvenirVolunteers = data;
        this.loadingVolunteers = false;
      }, (error) => {
        this.loadingVolunteers = false;
      });
  }

  getAllSeedsCombo(): void{
    this.trackingService.getActiveSeeds()
      .subscribe((data) => {
        this.allSeeds = data;
        this.loadingSeeds = false;
      }, (error) => {
        this.loadingSeeds = false;
      });
  }

  choseSeed(event: BoxSeed){
    this.selectedSeed = event
    this.panelOpenStateSeeds = false;
    this.form.patchValue({benefitedContributorId: event.contributor_id})
    if(this.selectedVolunteer=== null) this.panelOpenStateVolunteers = true;
  }

  choseVolunteer(event: BoxVolunteer){
    this.selectedVolunteer = event
    this.form.patchValue({volunteerInChargeId: event.volunter_id})
    this.panelOpenStateVolunteers = false;
  }

  setSouvenirTrackingStatus(){
    this.trackingStatus =  [
      {
        value: TrackingStatus.SOUVENIR_PENDING,
        selected: true,
        name: "Pendiente de envío"
      },
      {
        value: TrackingStatus.SOUVENIR_SENT,
        selected: false,
        name: "Souvenir enviado"
      },
      {
        value: TrackingStatus.SOUVENIR_DELIVERED,
        selected: true,
        name: "Souvenir entregado"
      }
    ]
  }

  sendData(){
    this.sendingValues = true;
    if(this.isUpdate){
      this.updateRegister();
    }else{
      this.createRegister();
    }
  }
  updateRegister(){
    this.souvenirTrackingService.updateSeedSouvenirTracking(this.form.value)
      .subscribe((data)=>{
        this.showMessage(data);
        this.emitter.emit({tabAction: {number: 1}}) ;
        this.sendingValues = false;
      },(error) =>{
        this.showMessage(error.error);
        this.sendingValues = false;
      })
  }
  createRegister(){
    this.souvenirTrackingService.createSeedSouvenirTracking(this.form.value)
      .subscribe((data)=>{
        this.showMessage(data);
        this.emitter.emit({tabAction: {number: 1}}) ;
        this.sendingValues = false;

      },(error) =>{
        this.showMessage(error.error);
        this.sendingValues = false;
      })
  }
  showMessage(data: any): void{
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: { data },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
  }

}
