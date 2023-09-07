import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges} from '@angular/core';
import {CellContent, CellParam, Table} from "../../../core/models/Table.model";
import {TrackingService} from "../../../core/services/tracking.service";
import {ApplicantService} from "../../../core/services/applicant.service";
import {MatBottomSheet} from "@angular/material/bottom-sheet";
import {MatDialog} from "@angular/material/dialog";
import {ModalDonationComponent} from "../manage-donations/modal-donation/modal-donation.component";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {ViewDonationComponent} from "../manage-donations/view-donation/view-donation.component";
import {ExitElementComponent} from "../../../shared/exit-element/exit-element.component";

@Component({
  selector: 'app-list-seed-donations',
  templateUrl: './list-seed-donations.component.html',
  styleUrls: ['./list-seed-donations.component.scss']
})
export class ListSeedDonationsComponent implements OnChanges {
  @Output() emitter: EventEmitter<{ tabAction }> = new EventEmitter();
  @Input() seedId: string;
  @Input() trackingAssignmentId: string;
  @Input() contributionConfigId: string;
  loadingTable = true;
  data: Table;

  loadingSeed = true;
  seed: any;
  constructor(private trackingService: TrackingService,
              private seedService: ApplicantService,
              private _bottomSheet: MatBottomSheet,
              private dialog: MatDialog) { }

  back(): void{
    this.emitter.emit({tabAction: {number: 1}}) ;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.getSeedInfo();
    this.getDonationsRecord();
  }

  actionOutput(evento: CellContent): void{
    const id = this.getDonationId(evento.params);
    console.log('event', evento);
    if (evento.clickedAction === 'SeeRecord'){
      this.onView(id);
      //this.selectedSeed.emit({seedId: evento.params[0].paramContent})
      // this.donations();
    }else if (evento.clickedAction === 'deleteRecord'){
      this.onDelete(id);
    } else if (evento.clickedAction === 'UpdateRecord'){
      this.openContributionModal(evento.params[0].paramContent);
    }
  }
  openContributionModal(contributionRecordId){
      const dialogConfig =  this.dialog.open(ModalDonationComponent, {
        disableClose: false,
        panelClass: 'icon-outside',
        autoFocus: true,
        width: '800px',
        data: {
          contributionRecordId: contributionRecordId,
          isUpdate: true
        }
      });
      dialogConfig.afterClosed().subscribe(result => {
        if (result){
          this.getDonationsRecord();
        }
      });

  }
  onAdding(): void{}
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

  onDelete(id: string): void{
    const dialogRef = this.dialog.open(ExitElementComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '500px',
      data: {
        isDelete: true,
        title: 'ELIMINAR REGISTRO DE APORTE',
        question: 'Al confirmar se eliminará el registro del aporte' +
          ' y ningun dato podra ser visible.' +
          ' ¿ Está seguro de eliminarlo ?'
      }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if(result?.status ==='afirmative'){

      }
    })
  }

  getDonationId(params: CellParam[]) :string{
    return params.find(p => p.paramName === 'contributionRecordId').paramContent;
  }
  newDonation(): void {
    const dialogConfig =  this.dialog.open(ModalDonationComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        seedId: this.seedId,
        tracking_assignment_id: this.trackingAssignmentId,
        contribution_config_id: this.contributionConfigId,
        isUpdate: false
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result){
        this.getDonationsRecord();
      }
    });
  }
  getDonationsRecord(): void{
    this.loadingTable = true;
    this.trackingService.listSeedTrackingRecords(this.seedId)
      .subscribe((table) => {
        this.data = table;
        this.loadingTable = false;
      });
  }

  getSeedInfo(){
    this.loadingSeed = true;
    this.seedService.getSeedById(this.seedId).subscribe((data) => {
      this.seed = data;
      this.loadingSeed = false;
    }, (error => {
      this.seed = null;
      this.loadingSeed = false;
    }))
  }

  public openPDF(): void {
    const DATA: any = document.getElementById('htmlData');
    html2canvas(DATA).then((canvas) => {
      const fileWidth = 208;
      const fileHeight = (canvas.height * fileWidth) / canvas.width;
      const FILEURI = canvas.toDataURL('image/png');
      const PDF = new jsPDF('p', 'mm', 'a4');
      const position = 0;
      PDF.addImage(FILEURI, 'PNG', 0, position, fileWidth, fileHeight);
      PDF.save('contributor-record.pdf');
    });
  }

  openBottomSheet(): void {
    /*this._bottomSheet.open(ExportSheetComponent).afterDismissed()
      .subscribe((dats) => {
        console.log('sale', dats);
      });*/
  }
}
