import {Component, OnInit, ViewChild} from '@angular/core';
import {FormBuilder} from "@angular/forms";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ApplicantService} from "../../../core/services/applicant.service";
import {SentDataMessageComponent} from "../../../shared/seed-form/sent-data-message/sent-data-message.component";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";

@Component({
  selector: 'app-new-seed-from-volunteer',
  templateUrl: './new-seed-from-volunteer.component.html',
  styleUrls: ['./new-seed-from-volunteer.component.scss']
})
export class NewSeedFromVolunteerComponent implements OnInit{
  donationType = null;
  applicantForm;
  contributionPayload;
  canSendForm = false;
  confCheck = false;
  sendingData = false;
  constructor(private _formBuilder: FormBuilder,
              private dialog: MatDialog,
              private matSnackBar: MatSnackBar,
              private applicantService: ApplicantService
  ) { }
  ngOnInit(): void {
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

  emitUniqueContribution(event){
    this.contributionPayload = event.uniqueDonation;
    event.uniqueDonation && this.donationType==='UNIQUE' ? (this.canSendForm = true) : ( this.canSendForm = false)
  }

  emitConstantContribution(event){
    this.contributionPayload = event.constantContribution;
    event.constantContribution && this.donationType==='CONSTANT' ?  (this.canSendForm = true) : ( this.canSendForm = false)
  }

  sentData(): void{
    this.sendingData = true;
    const {country, city, address, ...user} = this.applicantForm;
    const contributor = {country, city, address, user};
    this.contributionPayload.contributor = contributor;
    if (this.donationType === 'UNIQUE'){
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
