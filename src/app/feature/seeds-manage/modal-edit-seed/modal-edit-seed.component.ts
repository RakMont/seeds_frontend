import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../modal-process-seed/modal-process-seed.component";
import {ApplicantService} from "../../../core/services/applicant.service";
import {FormBuilder} from "@angular/forms";
import {Seed, SeedData} from "../../../core/models/Seed.model";
import {SentDataMessageComponent} from "../../../shared/seed-form/sent-data-message/sent-data-message.component";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-modal-edit-seed',
  templateUrl: './modal-edit-seed.component.html',
  styleUrls: ['./modal-edit-seed.component.scss']
})
export class ModalEditSeedComponent  implements OnInit {
  seedData: SeedData;
  loadingSeed = true;
  donationType = null;
  applicantForm;
  contributionPayload;
  canSendForm = false;
  sendingData = false;

  constructor(public dialogRef: MatDialogRef<ModalEditSeedComponent>,
              private _formBuilder: FormBuilder,
              private dialog: MatDialog,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private matSnackBar: MatSnackBar,
              private applicantService: ApplicantService) {
  }

  ngOnInit(): void {
    this.getSeedById();
  }

  getSeedById(): void {
    this.applicantService.getSeedById(this.data.contributorId)
      .subscribe((seed) => {
        this.seedData = seed;
        this.loadingSeed = false;

      });
  }

  chooseDonationType(event): void {
    console.log('chooseDonationType', event);
    // this.index = event.tabAction.number;
    this.donationType = event.donationType;
  }

  getPersonalInfo(event) {
    console.log('event getPersonalInfo', event);
    if (event) {
      this.applicantForm = event;
      this.donationType = event.donationType;
    }
  }

  emitUniqueContribution(event) {
    console.log('emitUniqueContribution', event);
    this.contributionPayload = event.uniqueDonation;
    event.uniqueDonation && this.donationType === 'APORTE_UNICO' ? (this.canSendForm = true) : (this.canSendForm = false)
  }

  emitConstantContribution(event) {
    console.log('emitConstantContribution', event);

    this.contributionPayload = event.constantContribution;
    event.constantContribution && this.donationType === 'APORTE_CONSTANTE' ? (this.canSendForm = true) : (this.canSendForm = false)
  }

  onSubmit(): void {
    this.sendingData = true;
    const {country, city, address, ...user} = this.applicantForm;
    const contributor = {country, city, address, user};
    this.contributionPayload.contributor = contributor;
    this.contributionPayload.contributorId = this.data.contributorId
    if (this.donationType === 'APORTE_UNICO') {
      this.updateUniqueApplicant()
    } else {
      this.updateConstantApplicant();
    }
  }

  updateConstantApplicant(){
    this.applicantService.updateConstantApplicant(this.contributionPayload)
      .subscribe((response) => {
        this.sendingData = false;
        this.sentMessage(response);
        this.dialogRef.close('success');
      }, (error) => {
        this.sendingData = false;
        this.showMessage(error.error);
      });
  }
  updateUniqueApplicant(){
    this.applicantService.updateUniqueApplicant(this.contributionPayload)
      .subscribe((response) => {
        this.sentMessage(response);
        this.sendingData = false;
        this.dialogRef.close('success');
      }, (error) => {
        this.sendingData = false;
        this.showMessage(error.error);
      });
  }
  sentMessage(data){
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: { data },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
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
