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
  loadingContributionConfig = true;
  contributionConfig: any;
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
    receipt_number: [null, Validators.required],
    receipt_code: [null, Validators.required],
    extra_income_ammount: [0],
    sent_payment_proof: [false],
//    extraExpense: [null, Validators.required],
    hasExtra: [false],
  });
  constructor(private fb: UntypedFormBuilder,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private utilService: UtilService,
              private matSnackBar: MatSnackBar,
              private contributionService: ContributionService,
              public dialogRef: MatDialogRef<ModalDonationComponent>,
              private contributionConfigService: ContributionConfigService) { }

  ngOnInit(): void {
    this.getContributionConfigById();
    this.initData();
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

  getContributionConfigById(): void{
    this.loadingContributionConfig = true;
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
      this.loadingContributionConfig = false;

    }, (error) => {
      this.contributionConfig = null;
      this.loadingContributionConfig = false;

      /*console.log('getContributionConfigById', error );
      this.contributionConfig = {
        contribution_config_id: 1,
        contribution_key: 'APORTE_CONSTANTE',
        contribution_id: '1',
        contribution: {
          const_contribution_id: '1',
          start_month: 'DICIEMBRE',
          paymentDate: 5,
          remainderType: 'CORREO_ELECTRONICO',
          contributionStartDate: '12/12/2022',
          contributionEndDate: '12/12/2023',
          contribution_amount: 35,
          paymentMethod: 'CODIGO_QR',
          send_news: true,
          sendNewsType: 'MENSAJE_WHATSSAP'
        }
      };
      this.donation.patchValue({
        paymentMethod: this.contributionConfig.contribution.paymentMethod
      });*/
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
