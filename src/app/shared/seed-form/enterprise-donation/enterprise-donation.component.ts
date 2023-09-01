import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {ContributionConfigData} from "../../../core/models/Seed.model";
import {FormBuilder, Validators} from "@angular/forms";
import {ComboElement} from "../../../core/models/Utils.model";
import {ApplicantService} from "../../../core/services/applicant.service";
import {UtilService} from "../../../core/services/util.service";

@Component({
  selector: 'app-enterprise-donation',
  templateUrl: './enterprise-donation.component.html',
  styleUrls: ['./enterprise-donation.component.scss']
})
export class EnterpriseDonationComponent implements OnInit, OnChanges{
  @Input() seedContribution: ContributionConfigData;
  @Output() emitter: EventEmitter<{ tabAction }> = new EventEmitter();
  @Output() enterpriseContribution: EventEmitter<{ enterpriseContribution }> = new EventEmitter();
  donationForm = this.formBuilder.group({
    contribution_amount: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    send_news: [true, Validators.required],
    date_contribution: ['', Validators.required],
    sendNewsType: [''],
  });
  sendingData = false;
  paymentMethods: ComboElement[] = [];
  newsTypes: ComboElement[] = [];
  contributor;
  myFilter = (d: Date | null): boolean => {
    if (!this.seedContribution){  return d > new Date()

    }
    else return true;
  };

  constructor(private formBuilder: FormBuilder,
              private applicantService: ApplicantService,
              private utilsService: UtilService) {
  }



  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.manageChanges();
    if(this.seedContribution){
      this.manageUpdate();
    }
    else{
      this.getPaymentMethods();
      this.getNewsTypes();

    }
  }
  manageUpdate(){
    this.donationForm.patchValue({
      contribution_amount: this.seedContribution.contribution.contributionAmount.toString(),
      paymentMethod: this.seedContribution.contribution.paymentMethod,
      send_news: this.seedContribution.contribution.sendNews,
      date_contribution: this.seedContribution.contribution.dateContribution,
      sendNewsType: this.seedContribution.contribution.sendNewsType,
    })
    this.getPaymentMethods();
    this.getNewsTypes();

  }
  get donationAmount(): any {
    return this.donationForm.get('contribution_amount');
  }
  get paymentMethod(): any {
    return this.donationForm.get('paymentMethod');
  }
  get getNews(): any {
    return this.donationForm.get('send_news');
  }
  get date_contribution(): any {
    return this.donationForm.get('date_contribution');
  }
  get newsMethod(): any {
    return this.donationForm.get('sendNewsType');
  }
  getErrorMessage(): any {
    if (this.donationForm.get('paymentMethod').hasError('required')) {
      return 'Debe elegir el método de pago';
    }
  }
  getDonationAmountError(): any {
    if (this.donationForm.get('contribution_amount').hasError('required')) {
      return 'Debe ingresar el monto de aporte';
    }
  }
  getPaymentDateError(): any {
    if (this.donationForm.get('date_contribution').hasError('required')) {
      return 'Debe elegir una fecha';
    }
  }
  getPaymentMethods(): void{
    this.utilsService.getPaymentMethods()
      .subscribe((data) => {
        this.paymentMethods = data.data;
      });
  }
  getNewsTypes(): void{
    this.utilsService.getNewTypes()
      .subscribe((data) => {
        this.newsTypes = data.data;
      });
  }
  next(): void {
    this.emitter.emit({tabAction: {number: 1}}) ;
  }
  get childscount(): string{
    let amount = Number(this.donationForm.get('contribution_amount').value);
    amount = Math.trunc(Number(amount) / 35);
    return amount + ' Niños';
  }

  get dolarsamount(): string{
    let amount = Number(this.donationForm.get('contribution_amount').value);
    amount = Math.trunc(Number(amount) / 5);
    return amount + '$U$ ';
  }

  get canSendForm(): boolean{
    return this.donationForm.get('send_news').value ?
      this.donationForm.get('sendNewsType').value !== null &&
      this.donationForm.valid
      : this.donationForm.valid;
  }

  manageChanges(){
    this.donationForm.valueChanges.subscribe(()=>{
      if (this.donationForm.valid){
        this.enterpriseContribution.emit(
          {enterpriseContribution: this.donationForm.value});
      } else {
        this.enterpriseContribution.emit(
          {enterpriseContribution: null});
      }
    })
  }
}
