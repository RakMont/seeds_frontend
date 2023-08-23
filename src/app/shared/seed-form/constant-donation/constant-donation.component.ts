import {Component, EventEmitter, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, UntypedFormBuilder, Validators} from "@angular/forms";
import {ComboElement} from "../../../core/models/Utils.model";
import {ApplicantService} from "../../../core/services/applicant.service";
import {UtilService} from "../../../core/services/util.service";

@Component({
  selector: 'app-constant-donation',
  templateUrl: './constant-donation.component.html',
  styleUrls: ['./constant-donation.component.scss']
})
export class ConstantDonationComponent implements OnInit {
  @Output() emitter: EventEmitter<{tabAction}> = new EventEmitter();
  @Output() constantContribution: EventEmitter<{ constantContribution }> = new EventEmitter();
  donationForm = this.formBuilder.group({
    contribution_amount: ['', Validators.required],
    paymentMethod: ['', Validators.required],
    beginMonth: ['', Validators.required],
    paymentDay: ['', Validators.required],
    send_news: [true, Validators.required],
    reminderMethod: ['', Validators.required],
    sendNewsType: ['', Validators.required],
  });
  sendingData = false;
  paymentMethods: ComboElement[] = [];
  newsTypes: ComboElement[] = [];
  reminderMethods: ComboElement[] = [];
  beginMonths: ComboElement[] = [];
  paymentNumberDays: ComboElement[] = [];
  contributor;
  constructor(private formBuilder: FormBuilder,
              private applicantService: ApplicantService,
              private utilsService: UtilService) { }

  ngOnInit(): void {
    this.getPaymentMethods();
    this.getNewsTypes();
    this.getReminderMethods();
    this.getBeginMonths();
    this.getPaymentNumberDays();
    this.manageChanges();
  }
  ngOnChanges(changes: SimpleChanges): void {

  }
  getPaymentMethods(): void{
    console.log('viene');
    this.utilsService.getPaymentMethods()
      .subscribe((data) => {
        this.paymentMethods = data.data;
        console.log('llega');
      });
  }
  getNewsTypes(): void{
    this.utilsService.getNewTypes()
      .subscribe((data) => {
        this.newsTypes = data.data;
      });
  }

  getReminderMethods(): void{
    this.utilsService.getReminderMethods()
      .subscribe((data) => {
        this.reminderMethods = data.data;
      });
  }

  getBeginMonths(): void{
    this.utilsService.getBeginMonths()
      .subscribe((data) => {
        this.beginMonths = data.data;
      });
  }

  getPaymentNumberDays(): void{
    this.utilsService.getPaymentNumberDay()
      .subscribe((data) => {
        this.paymentNumberDays = data.data;
      });
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
  get beginMonth(): any {
    return this.donationForm.get('beginMonth');
  }
  get paymentDay(): any {
    return this.donationForm.get('paymentDay');
  }
  get reminderMethod(): any {
    return this.donationForm.get('reminderMethod');
  }
  getReminderMethodErrorMessage(): any {
    if (this.donationForm.get('reminderMethod').hasError('required')) {
      return 'Debe elegir un método para recibir recordatorios';
    }
  }
  getPaymentDayErrorMessage(): any {
    if (this.donationForm.get('paymentDay').hasError('required')) {
      return 'Debe elegir el día del mes en el que realizara su aporte';
    }
  }
  getbeginMonthErrorMessage(): any {
    if (this.donationForm.get('beginMonth').hasError('required')) {
      return 'Debe elegir mes en el que empezará el ciclo de aportes';
    }
  }
  getPaymentMethodErrorMessage(): any {
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
  get childscount(): string{
    let amount = Number(this.donationForm.get('contribution_amount').value);
    amount = Math.trunc(amount / 35);
    return amount + ' Niños';
  }

  get dolarsamount(): string{
    let amount = Number(this.donationForm.get('contribution_amount').value);
    amount = Math.trunc(amount / 5);
    return amount + '$U$ ';
  }

  back(): void {
    this.emitter.emit({tabAction: {number: 1}}) ;
  }

  manageChanges(){
    this.donationForm.valueChanges.subscribe(()=>{
      if (this.donationForm.valid){
        this.constantContribution.emit(
          {constantContribution: this.donationForm.value});
      } else {
        this.constantContribution.emit(
          {constantContribution: null});
      }
    })
  }
}
