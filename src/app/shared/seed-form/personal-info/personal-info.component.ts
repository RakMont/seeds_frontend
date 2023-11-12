import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges} from '@angular/core';
import {FormBuilder, UntypedFormBuilder, Validators} from '@angular/forms';
import {ComboElement} from '../../../core/models/Utils.model';
import {ApplicantService} from '../../../core/services/applicant.service';
import {UtilService} from '../../../core/services/util.service';
import {SeedData} from "../../../core/models/Seed.model";

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Input() isFromVolunteer: boolean;
  @Input() seedData: SeedData = null;
  @Output() donationTypeEmitter: EventEmitter<{donationType}> = new EventEmitter();
  @Output() personalInfoEmitter: EventEmitter<any> = new EventEmitter();
  countries: ComboElement[];
  cities: ComboElement[];
  applicantForm = this.formBuilder.group({
    name: ['', Validators.required],
    lastname: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', Validators.required],
    dni: ['', Validators.required],
    birthdate: [new Date(new Date().setFullYear(new Date().getFullYear() - 16))
      ,Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    address: ['', Validators.required],
    donationType:['', Validators.required],
    isForeign : [false]
  });
  constructor(private formBuilder: FormBuilder,
              private applicantService: ApplicantService,
              private utilsService: UtilService) { }

  myFilter = (d: Date | null): boolean => {
    const year = new Date().getFullYear();
    return d?.getFullYear() < (year-15);
  };
  ngOnInit(): void {
    this.manageInfoFormChanges();
    if(this.seedData){
      this.manageUpdate();
    }else{
      this.getCountries();
      this.getCities();
      this.isForeignOnChange();
    }

  }

  isForeignOnChange(){
    this.applicantForm.get('isForeign').valueChanges.subscribe((data)=>{
      if (data){
        this.applicantForm.patchValue({
          city:'',
          country:''
        })
      } else{
        this.applicantForm.patchValue({
          city:this.cities[0]?.value,
          country:this.countries[0]?.value
        })
      }
    })
  }
  manageUpdate(){
    this.applicantForm.patchValue({
      name: this.seedData.name,
      lastname: this.seedData.lastname,
      email: this.seedData.email,
      phone: this.seedData.phone,
      dni: this.seedData.dni,
      birthdate: new Date(this.seedData.birthdate),
      country: this.seedData.country,
      city:this.seedData.city,
      address: this.seedData.address,
      donationType:this.seedData.contributionConfig.contributionType,
      isForeign: this.seedData.isForeign
    })
    this.getCountries();
    this.getCities();
    this.isForeignOnChange();
    this.donationTypeEmitter.emit({donationType: this.seedData.contributionConfig.contributionType});
  }
  getErrorMessage(): any {
    if (this.applicantForm.get('name').hasError('required')) {
      return 'Debe ingresar el nombre';
    }
    // return this.volunterform.get('name').hasError('email') ? 'Not a valid email' : '';
  }
  getErrorMessageLastname(): any {
    if (this.applicantForm.get('lastname').hasError('required')){
      return 'Debe ingresar el apellido';
    }
  }
  getErrorMessageEmail(): any {
    if (this.applicantForm.get('email').hasError('required')){
      return 'personal-info.fieldEmailError';
    }
    return this.email.hasError('email') ? 'personal-info.fieldEmailError2' : '';
  }

  getErrorMessagePhone(): any {
    if (this.applicantForm.get('phone').hasError('required')){
      return 'Debe ingresar un celular';
    }
  }

  getAdreesMessage(): any {
    if (this.applicantForm.get('address').hasError('required')){
      return 'Debe ingresar una dirección';
    }
  }

  getErrorMessageDNI(): any {
    if (this.applicantForm.get('dni').hasError('required')){
      return 'Debe ingresar el carnet de identidad';
    }
  }
  get name(): any {
    return this.applicantForm.get('name');
  }
  get lastname(): any {
    return this.applicantForm.get('lastname');
  }
  get email(): any {
    return this.applicantForm.get('email');
  }
  get phone(): any {
    return this.applicantForm.get('phone');
  }
  get dni(): any {
    return this.applicantForm.get('dni');
  }

  getCountries(): void{
    this.utilsService.getCountries()
      .subscribe((data) => {
        this.countries = data.data;
        //if (!this.seedData) this.applicantForm.get('country').setValue(this.countries[0].value);
      });
  }
  getCities(): void {
    this.utilsService.getAllCities()
      .subscribe((data) => {
        this.cities = data.data;
        //if (!this.seedData) this.applicantForm.get('city').setValue(this.cities[0].value);
      });
  }
  manageInfoFormChanges(){
    this.applicantForm.valueChanges.subscribe
    ((changes) => {
      if (this.applicantForm.valid){
        this.personalInfoEmitter.emit(this.applicantForm.value);
      }else {
        if (this.applicantForm.get('donationType').value) this.applicantForm.markAllAsTouched()

        this.personalInfoEmitter.emit(null);
      }
    })
  }

/*
  next(): void {
    this.donationTypeEmitter.emit({tabAction: {number: 0}}) ;
  }*/
  emitDonationType(donationType: string): void {
    this.applicantForm.get('donationType').setValue(donationType);
    //this.emitter.emit({tabAction: {number: 2, action: donationType}});
    /*if (this.applicantForm.valid){
      this.donationTypeEmitter.emit({tabAction: {number: 1}});
    }*/
    this.donationTypeEmitter.emit({donationType: this.applicantForm.get('donationType').value});
  }


}
