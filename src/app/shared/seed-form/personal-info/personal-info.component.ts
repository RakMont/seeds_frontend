import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {FormBuilder, UntypedFormBuilder, Validators} from '@angular/forms';
import {ComboElement} from '../../../core/models/Utils.model';
import {ApplicantService} from '../../../core/services/applicant.service';
import {UtilService} from '../../../core/services/util.service';

@Component({
  selector: 'app-personal-info',
  templateUrl: './personal-info.component.html',
  styleUrls: ['./personal-info.component.scss']
})
export class PersonalInfoComponent implements OnInit {
  @Output() emitter: EventEmitter<{tabAction}> = new EventEmitter();
  @Output() personalInfo: EventEmitter<any> = new EventEmitter();
  constructor(private formBuilder: FormBuilder,
              private applicantService: ApplicantService,
              private utilsService: UtilService) { }
  countries: ComboElement[];
  applicantForm = this.formBuilder.group({
    name: [null, Validators.required],
    lastname: [null, Validators.required],
    email: [null, [Validators.required, Validators.email]],
    phone: [null, Validators.required],
    dni: [null, Validators.required],
    birthdate: [new Date(new Date().setFullYear(new Date().getFullYear() - 16))
      ,Validators.required],
    country: [null, Validators.required],
    city: [null, Validators.required],
    address: [null, Validators.required],
  });
  myFilter = (d: Date | null): boolean => {
    const year = new Date().getFullYear();
    return d?.getFullYear() < (year-15);
  };
  ngOnInit(): void {
    this.getCountries();
    this.manageInfoFormChanges();
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
      return 'Debe ingresar el correo';
    }
    return this.email.hasError('email') ? 'Debe ingresar un correo valido' : '';
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
      });
  }

  manageInfoFormChanges(){
    this.applicantForm.valueChanges.subscribe(() => {
      if (this.applicantForm.valid){
        this.personalInfo.emit(this.applicantForm.value);
      }else {
        this.personalInfo.emit(null);
      }
    })
  }
}
