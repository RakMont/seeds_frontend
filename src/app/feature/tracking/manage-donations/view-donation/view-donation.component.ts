import {Component, Inject, OnInit} from '@angular/core';
import {ContributionService} from "../../../../core/services/contribution.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ContributionRecord} from "../../../../core/models/ContributionRecord.model";

export interface DialogData{
  selectSeed
  donationId: string
  edit: boolean
}
@Component({
  selector: 'app-view-donation',
  templateUrl: './view-donation.component.html',
  styleUrls: ['./view-donation.component.scss']
})
export class ViewDonationComponent implements OnInit{
  contributionRecord: ContributionRecord;
  loadingContributionConfig = true;

  constructor( @Inject(MAT_DIALOG_DATA) public data: DialogData,
               private contributionService: ContributionService,
               public dialogRef: MatDialogRef<ViewDonationComponent>){

  }
  ngOnInit(): void {
    console.log('this', this.data);
    this.getContributionRecordById();
  }

  getContributionRecordById(): void {
    this.loadingContributionConfig = true;
    this.contributionService.getContributionRecordById(
      this.data.donationId)
      .subscribe((data) => {
        this.contributionRecord =data;
        console.log("data", this.contributionRecord);
        this.loadingContributionConfig = false;
      },(error => {
        this.loadingContributionConfig = false;
      }))
  }
}
