import {Component, OnInit} from '@angular/core';
import {UntypedFormBuilder, Validators} from "@angular/forms";
import {ComboElement} from "../../../core/models/Utils.model";
import {Table, TableRow} from "../../../core/models/Table.model";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {Router} from "@angular/router";
import {UtilService} from "../../../core/services/util.service";
import {ContributionService} from "../../../core/services/contribution.service";
import {ReportServiceService} from "../../../core/services/report-service.service";
import { saveAs } from 'file-saver';
import {ExportSheetComponent} from "./export-sheet/export-sheet.component";
import {ReportType} from "../../../core/models/ContributionRecord.model";

@Component({
  selector: 'app-manage-donations',
  templateUrl: './manage-donations.component.html',
  styleUrls: ['./manage-donations.component.scss']
})
export class ManageDonationsComponent implements OnInit {
  filterForm = this.fb.group({
    beginDate: ['', Validators.required],
    endDate: ['', Validators.required],
    contributionType: [''],
    paymentMethod: [],
    reportType: ReportType,
    activePaymentMethod: [],
  });
  paymentMethods: ComboElement[] = [];
  contributionTypes: ComboElement[] = [];
  tracking: TableRow[];
  loadingTracking = true;

  loadingTable = true;
  data: Table;

  loadingSeed = true;
  seed: any;

  constructor( private fb: UntypedFormBuilder,
               private contributionReportService: ReportServiceService,
               private contributionService: ContributionService,
               private _bottomSheet: MatBottomSheet,
               private router: Router,
               private utilServce: UtilService) { }

  ngOnInit(): void {
    this.getPaymentMethods();
    this.getContributionTypes();
    //this.getContributionRecords();
    this.paymentMethodActiveValueChanges();
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
          paymentMethod: this.paymentMethods[0].value
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
}
