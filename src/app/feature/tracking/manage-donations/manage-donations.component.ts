import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ComboElement} from "../../../core/models/Utils.model";
import {CellParam, Table, TableRow} from "../../../core/models/Table.model";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Router} from "@angular/router";
import {UtilService} from "../../../core/services/util.service";
import {ContributionService} from "../../../core/services/contribution.service";
import {ReportServiceService} from "../../../core/services/report-service.service";
import { saveAs } from 'file-saver';
import {ExportSheetComponent} from "./export-sheet/export-sheet.component";
import {ReportType} from "../../../core/models/ContributionRecord.model";
import {ViewDonationComponent} from "./view-donation/view-donation.component";
import {MatDialog} from "@angular/material/dialog";
import {MatAutocompleteSelectedEvent} from "@angular/material/autocomplete";
import {MatOptionSelectionChange} from "@angular/material/core";
import {BoxVolunteer} from "../../../core/models/Souvenir.model";
import {map, Observable, startWith} from "rxjs";
import {VolunteerService} from "../../../core/services/volunteer.service";

@Component({
  selector: 'app-manage-donations',
  templateUrl: './manage-donations.component.html',
  styleUrls: ['./manage-donations.component.scss']
})
export class ManageDonationsComponent implements OnInit {
  filterForm = this.fb.group({
    beginDate: ['', Validators.required],
    endDate: ['', Validators.required],
    volunter_id: [''],
    searchValue: [],
    contributionType: [''],
    paymentMethod: [],
    reportType: ReportType,
    activePaymentMethod: [],
  });
  filteredSeeds: Observable<BoxVolunteer[]>;
  loadingAll = true;
  paymentMethods: ComboElement[] = [];
  contributionTypes: ComboElement[] = [];
  tracking: TableRow[];
  loadingTracking = true;

  loadingTable = true;
  data: Table;

  loadingSeed = true;
  seed: any;
  allTrackingVolunteers: BoxVolunteer[] = [];

  constructor( private fb: UntypedFormBuilder,
               private contributionReportService: ReportServiceService,
               private contributionService: ContributionService,
               private _bottomSheet: MatBottomSheet,
               private dialog: MatDialog,
               private router: Router,
               private volunteerService: VolunteerService,
               private utilServce: UtilService) { }

  ngOnInit(): void {
    this.getPaymentMethods();
    this.getContributionTypes();
    //this.getContributionRecords();
    this.paymentMethodActiveValueChanges();
    this.getTrackingVolunteers();
  }
  getPaymentMethods(): void{
    const beginDate=new Date();
    beginDate.setFullYear(beginDate.getUTCFullYear()-1);
    const endDate=new Date();
    endDate.setMonth(endDate.getMonth()+6);
    this.utilServce.getPaymentMethods()
      .subscribe((data) => {
        this.paymentMethods = data.data;
        this.paymentMethods.push({
          value: "",
          selected: false,
          name: "TODOS"
        });
        this.filterForm.patchValue({
          beginDate: beginDate,
          endDate: endDate,
          paymentMethod: this.paymentMethods[4].value
        });
        this.getContributionRecords();
      });

  }


  getReport(){
    let payload = this.filterForm.value;
    this.contributionReportService.getContributionRecordsReport(payload)
      .subscribe((data: Blob)=>{
        const file = new Blob([data], {type: 'application/pdf'});
        if (payload.reportType === ReportType.TOTAL_AMOUNT_PDF){
          const fileURL = URL.createObjectURL(file);
          saveAs(data, 'contribution_records.pdf');
           window.open(fileURL, '_blank', );
        }else if(payload.reportType === ReportType.TOTAL_AMOUNT_CSV){
          saveAs(data, 'contributionRecords.xlsx');
        }
    },(error)=>{
        console.log("error",error);
      })
  }

  getContributionTypes(): void {
    this.contributionTypes = [
      {
        value: "APORTE_UNICO",
        selected: true,
        name: "APORTE ÚNICO"
      },
      {
        value: "APORTE_CONSTANTE",
        selected: false,
        name: "APORTE CONSTANTE"
      },
      {
        value:"APORTE_EMPRESAS",
        selected:false,
        name:"APORTE EMPRESAS"
      },
      {
        value:"",
        selected:false,
        name:"TODOS"
      }
    ]
  }

  getContributionRecords(): void{
    let payload = this.filterForm.value;
    this.loadingTable = true;
    this.contributionService.listContributionRecords(payload)
      .subscribe((table) => {
        this.data = table;
        this.loadingTable = false;
      });
  }

  actionOutput(event){
    const id = this.getDonationId(event.params);
    if (event.clickedAction === 'SeeRecord') {
      this.onView(id);
    }
  }
  getDonationId(params: CellParam[]) :string{
    return params.find(p => p.paramName === 'contributionRecordId').paramContent;
  }
  openBottomSheet(): void {
    this._bottomSheet.open(ExportSheetComponent).afterDismissed()
      .subscribe((dats) => {
        if (dats === 'PDF'){
          this.filterForm.get('reportType').setValue(ReportType.TOTAL_AMOUNT_PDF)
          this.getReport();
        }
        else if(dats ==='EXCEL'){
          this.filterForm.get('reportType').setValue(ReportType.TOTAL_AMOUNT_CSV)
          this.getReport();
        }
      });
  }

  buttonGetRecords(){
      this.getContributionRecords();

  }
  paymentMethodActiveValueChanges(){
    this.filterForm.get('activePaymentMethod').valueChanges
      .subscribe((data)=>{
      if(data){
        this.filterForm.get('paymentMethod').setValue('');
      }
    })
  }

  onView(id: string): void{
    const dialogRef = this.dialog.open(ViewDonationComponent, {
      disableClose: false,
      autoFocus: true,
      panelClass: 'icon-outside',
      width: '800px',
      data: {
        donationId: id,
        edit: false
      }
    });
  }

  selected(evento: MatAutocompleteSelectedEvent){
    this.filterForm.get('volunter_id').setValue(evento.option.value.volunter_id);
    console.log('selected', evento);
  }
  updateMySelection(evento: MatOptionSelectionChange): void{
    this.filterForm.patchValue({
      searchValue: evento.source.value.largename
    });
  }
  private _filter(value: string): BoxVolunteer[] {
    if (typeof  value === 'string'){
      const filterValue = value.toLowerCase();
      return this.allTrackingVolunteers.filter(option =>
        option.largename.toLowerCase().includes(filterValue) ||
        option.dni.toLowerCase().includes(filterValue) ||
        option.email.toLowerCase().includes(filterValue)
      );
    }
  }

  getTrackingVolunteers(): void{
    this.volunteerService.getComboTrackingVolunteers()
      .subscribe((data) => {
        this.allTrackingVolunteers = data;
        this.loadingAll = false;
        this.filteredSeeds = this.filterForm.get('searchValue').valueChanges.pipe(
          startWith(''),
          map(value => this._filter(value || '')),
        );
      }, (error) => {
        this.loadingAll = false;
      });
  }

  clearVolunteer(){
    this.filterForm.patchValue({
      searchValue: null,
      volunter_id: null
    });
  }
}
