import {Component, Inject, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ComboElement} from "../../../../core/models/Utils.model";
import {UtilService} from "../../../../core/services/util.service";
import {MessageSnackBarComponent} from "../../../../shared/message-snack-bar/message-snack-bar.component";
import {ContributionService} from "../../../../core/services/contribution.service";
import {ContributionConfigService} from "../../../../core/services/contribution-config.service";

export interface DialogData{
  selectSeed
}
@Component({
  selector: 'app-modal-unique-donation',
  templateUrl: './modal-unique-donation.component.html',
  styleUrls: ['./modal-unique-donation.component.scss']
})
export class ModalUniqueDonationComponent implements OnInit{
  loadingContributionConfig = true;
  contributionConfig: any;
  paymentMethods: ComboElement[];
  contributionRecord;
  donation = this.fb.group({
    contribution_record_id: '',
    tracking_assignment_id: ['', Validators.required],
    contribution_config_id: ['', Validators.required],
    contributor_id: ['', Validators.required],
    payment_date: ['', Validators.required],
    expected_payment_date: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    contribution_ammount  :  ['', Validators.required],
    receipt_number: ['', Validators.required],
    receipt_code: ['', Validators.required],
    extra_income_ammount: [0],
    sent_payment_proof: [false],
    hasExtra: [false],
  });
  constructor(private fb: UntypedFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private matSnackBar: MatSnackBar,
              private utilService: UtilService,
              private contributionService: ContributionService,
              private contributionConfigService: ContributionConfigService,
              public dialogRef: MatDialogRef<ModalUniqueDonationComponent>) {
  }
  ngOnInit(): void {
    console.log('asdasdasd', this.data)
    if (this.data.selectSeed.isUpdate){
      this.getContributionRecordById();
      this.initData();
    }
    else {
      this.getContributionConfigById();
      this.initData();
    }
  }

  getContributionRecordById(): void {
    this.contributionService.getContributionRecordById(this.data.selectSeed.contributionRecordId)
      .subscribe((data) => {
        this.contributionRecord = data;
        //console.log('getContributionRecordById', data)
        this.donation.patchValue({
          contribution_record_id: data.contributionRecordId,
          contribution_config_id: data.contributionConfigId,
          tracking_assignment_id: data.trackingAssignmentId,
          contributor_id: data.contributorDTO.seedId,
          contribution_ammount: data.contributionAmount,
          expected_payment_date: data.expectedPaymentDate,
          hasExtra: data.extraIncomeAmount > 0,
          extra_income_ammount: data.extraIncomeAmount,
          payment_date: data.paymentDate,
          paymentMethod: data.paymentMethod,
          sent_payment_proof: data.sentPaymentProof,
          receipt_number: data.receiptNumber,
          receipt_code: data.receiptCode,
        })
      })
  }
  getContributionConfigById(): void{
    this.loadingContributionConfig = true;
    this.contributionConfigService.getContributionConfigById(
      this.data.selectSeed.contributionConfigId
    ).subscribe((data) => {
      this.contributionConfig = data;
      this.donation.patchValue({
        paymentMethod: this.contributionConfig.contribution.paymentMethod,
        contribution_ammount: this.contributionConfig.contribution.contributionAmount,
        contributor_id: this.data.selectSeed.idSelectedSeeds,
        contribution_config_id: this.data.selectSeed.contributionConfigId,
        tracking_assignment_id: this.data.selectSeed.trackingAssignmentId,
        expected_payment_date: this.contributionConfig.contribution.dateContribution
      });
      console.log('donations', this.donation.value)
      this.loadingContributionConfig = false;

    }, (error) => {
      this.contributionConfig = null;
      this.loadingContributionConfig = false;
    });
  }
  initData(): void{
    this.getPaymentMethods();
  }
  getPaymentMethods(): void {
    this.utilService.getPaymentMethods()
      .subscribe((data) => {
        this.paymentMethods = data.data;
      });
  }
  get donationAmount(): any {
    return this.donation.get('contribution_ammount');
  }
  getDonationAmountError(): any {
    if (this.donation.get('contribution_ammount').hasError('required')) {
      return 'Debe ingresar el monto de aporte';
    }
  }

  get childCount(): string{
    let amount = this.donation.get('contribution_ammount').value;
    amount = Math.trunc(Number(amount) / 35);
    return amount + ' Niños';
  }

  sendData(){
    const payload = this.donation.value
   if(this.data.selectSeed.isUpdate){
     this.updateRecord(payload);
   }
   else{
     this.createRecord(payload);
   }
  }

  updateRecord (payload){
    this.contributionService.updateContribution(payload)
      .subscribe((res) => {
        this.showMessage(res);
        this.dialogRef.close('success');
      },(error => {
        this.showMessage(error.error);
        this.dialogRef.close();
      }))
  }
  createRecord(payload){
    this.contributionService.saveContribution(payload)
      .subscribe((res) => {
        this.showMessage(res);
        this.dialogRef.close('success');
      },(error => {
        this.showMessage(error.error);
        this.dialogRef.close();
      }))
  }
  showMessage(data: any): void{
    console.log('errormessage', data);
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: { data },
      duration: 4000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
  }


}
