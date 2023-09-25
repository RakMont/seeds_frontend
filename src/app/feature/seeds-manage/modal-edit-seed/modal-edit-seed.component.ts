import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../modal-process-seed/modal-process-seed.component";
import {ApplicantService} from "../../../core/services/applicant.service";
import {FormBuilder} from "@angular/forms";
import {Seed, SeedData} from "../../../core/models/Seed.model";
import {SentDataMessageComponent} from "../../../shared/seed-form/sent-data-message/sent-data-message.component";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {DonationType} from "../../../core/models/ContributionRecord.model";

@Component({
  selector: 'app-modal-edit-seed',
  templateUrl: './modal-edit-seed.component.html',
  styleUrls: ['./modal-edit-seed.component.scss']
})
export class ModalEditSeedComponent  implements OnInit {
  seedData: SeedData;
  loadingSeed = true;
  donationType = null;
  applicantForm = null;
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
    // this.index = event.tabAction.number;
    this.donationType = event.donationType;
  }

  getPersonalInfo(event) {
      this.applicantForm = event;
      if (event) this.donationType = event?.donationType;
  }

  emitContribution(event){
    switch (this.donationType) {
      case DonationType.APORTE_EMPRESAS:
        this.contributionPayload = event.enterpriseContribution
        break;
      case DonationType.APORTE_UNICO:
        this.contributionPayload = event.uniqueDonation
        break;
      case DonationType.APORTE_CONSTANTE:
        this.contributionPayload = event.constantContribution
        break;
    }

    this.contributionPayload ? (this.canSendForm = true) : (this.canSendForm = false);
  }
  onSubmit(): void {
    this.sendingData = true;
    const {country, city, address, ...user} = this.applicantForm;
    const contributor = {country, city, address, user};
    this.contributionPayload.contributor = contributor;
    this.contributionPayload.contributorId = this.data.contributorId
    if (this.donationType === 'APORTE_UNICO') {
      this.updateUniqueApplicant()
    } else if (this.donationType === 'APORTE_CONSTANTE'){
      this.updateConstantApplicant();
    } else if (this.donationType === 'APORTE_EMPRESAS'){
      this.updateEnterpriseSeed();
    }
  }
  updateEnterpriseSeed(){
    this.applicantService.updateEnterpriseApplicant(this.contributionPayload)
      .subscribe((response) => {
        this.showMessage(response);
        this.sendingData = false;
        this.dialogRef.close('success');
      }, ( error ) => {
        this.sendingData = false;
        this.showMessage(error.error);
      });
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

  get canSend(){
    return this.applicantForm != null && !this.sendingData;
  }
}
