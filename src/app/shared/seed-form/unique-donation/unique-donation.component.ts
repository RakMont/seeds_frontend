import {Component, EventEmitter, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, UntypedFormBuilder, Validators} from "@angular/forms";
import {ComboElement} from "../../../core/models/Utils.model";
import {ApplicantService} from "../../../core/services/applicant.service";
import {UtilService} from "../../../core/services/util.service";

@Component({
  selector: 'app-unique-donation',
  templateUrl: './unique-donation.component.html',
  styleUrls: ['./unique-donation.component.scss']
})
export class UniqueDonationComponent implements OnInit, OnChanges {
  @Output() emitter: EventEmitter<{ tabAction }> = new EventEmitter();
  @Output() uniqueDonation: EventEmitter<{ uniqueDonation }> = new EventEmitter();
  donationForm = this.formBuilder.group({
    contribution_amount: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    send_news: [true, Validators.required],
    date_contribution: ['', Validators.required],
    sendNewsType: [null],
  });
  sendingData = false;
  paymentMethods: ComboElement[] = [];
  newsTypes: ComboElement[] = [];
  contributor;
  myFilter = (d: Date | null): boolean => {
    /* const day = (d || new Date()).getDay();
     return day !== 0 && day !== 6;*/
    return d > new Date()
  };

  constructor(private formBuilder: FormBuilder,
              private applicantService: ApplicantService,
              private utilsService: UtilService) {
  }

  ngOnChanges(changes: SimpleChanges): void {
  }

  ngOnInit(): void {
    this.getPaymentMethods();
    this.getNewsTypes();
    this.manageChanges();
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
        this.uniqueDonation.emit(
          {uniqueDonation: this.donationForm.value});
      } else {
        this.uniqueDonation.emit(
          {uniqueDonation: null});
      }
    })
  }
}
