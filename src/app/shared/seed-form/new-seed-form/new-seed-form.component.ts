import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {MatSnackBar} from '@angular/material/snack-bar';
import {ApplicantService} from '../../../core/services/applicant.service';
import {MessageSnackBarComponent} from "../../message-snack-bar/message-snack-bar.component";
import {SentDataMessageComponent} from "../sent-data-message/sent-data-message.component";
import {StepperSelectionEvent} from "@angular/cdk/stepper";

@Component({
  selector: 'app-new-seed-form',
  templateUrl: './new-seed-form.component.html',
  styleUrls: ['./new-seed-form.component.scss']
})
export class NewSeedFormComponent implements OnInit {
  @ViewChild('stepper') stepper;
  index = 0;
  donationType = null;
  showDonationTypes = false;
  showDonationDetails = false;

  applicantForm;
  justSentForm = false;
  sendingData = false;

  isLinear = false;
  confCheck = false;
  contributionPayload;
  canSendForm = false;

  firstFormGroup = this._formBuilder.group({
    firstCtrl: ['', Validators.required],
  });
  secondFormGroup = this._formBuilder.group({
    secondCtrl: ['', Validators.required],
  });


  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog,
              private matSnackBar: MatSnackBar,
              private applicantService: ApplicantService
  ) { }
  ngOnInit(): void {
  }


  onSubmit(): void{
    console.log('asdas', this.applicantForm.value);
  }
  move_tab(event): void{
    this.index = event.tabAction.number;
    this.donationType = event.tabAction.action;
  }

  selectionChange(event: StepperSelectionEvent) {
    console.log('selectionChange',event.selectedStep.label);
    //let stepLabel = event.selectedStep.label
    this.index = event.selectedIndex;
  }
  chooseDonationType(event): void {
    console.log('chooseDonationType', event);
   // this.index = event.tabAction.number;
    this.donationType = event.donationType;
  }
  getPersonalInfo(event){
    console.log('event getPersonalInfo', event);
    if(event){
      this.applicantForm = event;
      this.donationType = event.donationType;
    }
  }

  onTabChanged(evento): void{
    this.index = evento.index;
  }
  emitUniqueContribution(event){
    this.contributionPayload = event.uniqueDonation;
    event.uniqueDonation && this.donationType==='APORTE_UNICO' ? (this.canSendForm = true) : ( this.canSendForm = false)
  }

  emitConstantContribution(event){
    this.contributionPayload = event.constantContribution;
    event.constantContribution && this.donationType==='APORTE_CONSTANTE' ?  (this.canSendForm = true) : ( this.canSendForm = false)
  }

  sentData(): void{
    this.sendingData = true;
    const {country, city, address, ...user} = this.applicantForm;
    const contributor = {country, city, address, user};
    this.contributionPayload.contributor = contributor;
    if (this.donationType === 'APORTE_UNICO'){
      this.applicantService.createUniqueApplicant(this.contributionPayload)
        .subscribe((response) => {
          this.sentInformaTionMessage(response);
          this.sendingData = false;
        }, ( error ) => {
          this.sendingData = false;
          this.showMessage(error.error);
        });
    }else {
      this.applicantService.createConstantApplicant(this.contributionPayload)
        .subscribe((response) => {
          this.sendingData = false;
          this.sentInformaTionMessage(response);
        }, ( error ) => {
          this.sendingData = false;
          this.showMessage(error.error);
        });
    }
  }

  sentDataConstant(): void{
    this.sendingData = true;
    const {country, city, address, ...user} = this.applicantForm;
    const contributor = {country, city, address, user};
    this.contributionPayload.contributor = contributor;
  }

  sentInformaTionMessage(data){
    const dialogConfig =  this.dialog.open(SentDataMessageComponent, {
      data: { data },
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '500px',
    });
    dialogConfig.afterClosed().subscribe(result => {
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
