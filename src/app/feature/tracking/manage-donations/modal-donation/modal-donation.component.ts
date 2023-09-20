import {Component, Inject, OnInit} from '@angular/core';
import { ComboElement } from 'src/app/core/models/Utils.model';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {UtilService} from "../../../../core/services/util.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ContributionConfigService} from "../../../../core/services/contribution-config.service";
import {MessageSnackBarComponent} from "../../../../shared/message-snack-bar/message-snack-bar.component";
import {ContributionService} from "../../../../core/services/contribution.service";

export interface DialogData {
  id: string;
  contributionRecordId: string;
  tracking_assignment_id: string;
  contribution_config_id: string;
  seedId: string;
  isUpdate: boolean;
}

@Component({
  selector: 'app-modal-donation',
  templateUrl: './modal-donation.component.html',
  styleUrls: ['./modal-donation.component.scss']
})
export class ModalDonationComponent implements OnInit {
  loadingContributionProcess = true;
  contributionConfig: any;
  contributionRecord;
  paymentMethods: ComboElement[];
  donation = this.fb.group({
    contribution_record_id: null,
    tracking_assignment_id: [null, Validators.required],
    contribution_config_id: [null, Validators.required],
    contributor_id: [null, Validators.required],
    payment_date: [null, Validators.required],
    expected_payment_date: [null, Validators.required],
    paymentMethod: [null, Validators.required],
    contribution_ammount  : [null, Validators.required],
    receipt_number: [''],
    receipt_code: [''],
    extra_income_ammount: [0],
    sent_payment_proof: [false],
    hasExtra: [false],
    hasExtraExpense:[false],
    extraExpenseId:'',
    extraExpenseAmount:'',
    extraExpenseReason:'',
  });
  constructor(private fb: UntypedFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private utilService: UtilService,
              private matSnackBar: MatSnackBar,
              private contributionService: ContributionService,
              public dialogRef: MatDialogRef<ModalDonationComponent>,
              private contributionConfigService: ContributionConfigService) { }

  ngOnInit(): void {
    if (this.data.isUpdate){
      this.getContributionRecordById();
      this.initData();
    }else{
      this.getContributionConfigById();
      this.initData();
    }

  }
  getContributionRecordById(): void {
    this.contributionService.getContributionRecordById(this.data.contributionRecordId)
      .subscribe((data) => {
        this.contributionRecord = data;
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
          hasExtraExpense: data.hasExtraExpense,
          extraExpenseAmount: data.extraExpenseAmount,
          extraExpenseReason: data.extraExpenseReason
        })
        this.loadingContributionProcess=false;
      },(error)=>{
        this.loadingContributionProcess=false;
      })
  }
  initData(): void{
    this.getPaymentMethods();
    this.onExtraExpenseChange();
  }

  getPaymentMethods(): void {
    this.utilService.getPaymentMethods()
      .subscribe((data) => {
        this.paymentMethods = data.data;
      });
  }

  getContributionConfigById(): void{
    this.loadingContributionProcess = true;
    this.contributionConfigService.getContributionConfigById(
      this.data.contribution_config_id
    ).subscribe((data) => {
      this.contributionConfig = data;
      this.donation.patchValue({
        paymentMethod: this.contributionConfig.contribution.paymentMethod,
        contribution_ammount: this.contributionConfig.contribution.contributionAmount,
        contributor_id: this.data.seedId,
        contribution_config_id: this.data.contribution_config_id,
        tracking_assignment_id: this.data.tracking_assignment_id
      });
      this.loadingContributionProcess = false;

    }, (error) => {
      this.contributionConfig = null;
      this.loadingContributionProcess = false;


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
  getPaymentDateError(): any {
    if (this.donation.get('payment_date').hasError('required')) {
      return 'Debe ingresar la fecha de aporte';
    }
  }
  getExpectedPaymentDateError(): any {
    if (this.donation.get('expected_payment_date').hasError('required')) {
      return 'Debe ingresar la fecha esperada de aporte';
    }
  }
  get childscount(): string{
    let amount = this.donation.get('contribution_ammount').value;
    amount = Math.trunc(Number(amount) / 35);
    return amount + ' Niños';
  }

  sendData(){
    const payload = this.donation.value
    if(this.data.isUpdate){
      this.updateRecord(payload);
    }
    else{
      this.createRecord(payload);
    }
  }
  updateRecord(payload){
    this.loadingContributionProcess = true;
    this.contributionService.updateContribution(payload)
      .subscribe((res) => {
        this.showMessage(res);
        this.dialogRef.close('success');
        this.loadingContributionProcess = false;

      },(error => {
        this.showMessage(error.error);
        this.loadingContributionProcess = false;
        this.dialogRef.close();
      }))
  }
  createRecord(payload){
    this.loadingContributionProcess = true;
    this.contributionService.saveContribution(payload)
      .subscribe((res) => {
        this.showMessage(res);
        this.loadingContributionProcess = false;
        this.dialogRef.close('success');
      },(error => {
        this.showMessage(error.error);
        this.loadingContributionProcess = false;
        this.dialogRef.close();
      }))
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

  onExtraExpenseChange(){
    this.donation.get('hasExtraExpense').valueChanges.subscribe((data)=>{
     console.log('hasExtraExpense', data)
      if(!data){
        this.donation.patchValue({
          extraExpenseId:'',
          extraExpenseAmount:'',
          extraExpenseReason:'',
          extraExpenseDate:''
        })
      }
    })
  }
}
