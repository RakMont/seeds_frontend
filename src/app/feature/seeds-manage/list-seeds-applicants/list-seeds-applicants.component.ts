import {Component, OnInit} from '@angular/core';
import {CellContent, CellParam, Table} from "../../../core/models/Table.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../core/services/auth.service";
import {ApplicantService} from "../../../core/services/applicant.service";
import {ModalProcessSeedComponent} from "../modal-process-seed/modal-process-seed.component";
import {ModalViewSeedComponent} from "../modal-view-seed/modal-view-seed.component";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {SeedFilter} from "../../../core/models/Seed.model";

@Component({
  selector: 'app-list-seeds-applicants',
  templateUrl: './list-seeds-applicants.component.html',
  styleUrls: ['./list-seeds-applicants.component.scss']
})
export class ListSeedsApplicantsComponent implements OnInit{
  loadingtable = true;
  volunteerProcess: string;
  lastStatus = '';

  data: Table;
  val = this.formBuilder.group({
    state: [null]
  });
  constructor(private router: Router,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private matSnackBar: MatSnackBar,
              private authService: AuthService,
              private applicantService: ApplicantService) { }

  ngOnInit(): void {
    //this.getAprovedSeeds();
    this.valueChanges();
    this.getCurrentUser();
    this.val.patchValue({state: 'ACCEPTED'});
  }

  getAcceptedSeeds(): void{
    this.loadingtable = true;
    let filter:SeedFilter = {
      status:'ACCEPTED'
    }
    this.applicantService.listConfirmedSeeds(filter).subscribe(
      (data) => {
        this.data = data;
        this.loadingtable = false;
      }
    );
  }

  actionOutput(event: CellContent): void{
    const id = this.getSeedId(event.params);
    if (event.clickedAction === 'AcceptSeed'){
      this.onAccept(id);
    }else if (event.clickedAction === 'RejectSeed'){
      this.onReject(id);
    } else if (event.clickedAction === 'SeedInfo'){
      this.onView(id);
    }
  }


  getCurrentUser(){
    this.authService.getCurrentUser()
      .subscribe((data) =>{
        this.volunteerProcess = data.volunterId;
      })
  }
  onReject(applicantId: string): void {
    const dialogConfig =  this.dialog.open(ModalProcessSeedComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '700px',
      data: {
        contributorId: applicantId,
        volunteerId: this.volunteerProcess,
        isReject: true
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      this.afterClose(result);
    });
  }

  onAccept(applicantId): void {
    const dialogConfig =  this.dialog.open(ModalProcessSeedComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '700px',
      data: {
        contributorId: applicantId,
        volunteerId: this.volunteerProcess,
        isReject: false
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      this.afterClose(result);
    });
  }

  onView(id): void{
    const dialogConfig =  this.dialog.open(ModalViewSeedComponent, {
      disableClose: false,
      autoFocus: true,
      width: '800px',
      data: {
        contributorId: id,
      }
    });
  }

  getSeedId(params: CellParam[]): string{
    return params.find(p => p.paramName === 'contributorId')?.paramContent;
  }

  showMessage(messages: any[]): void{
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: messages,
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
  }

  valueChanges(){
    this.val.get('state').valueChanges.subscribe((value => {
      if(value && value!=this.lastStatus){
        this.getSeedsApplicants(value);
        this.lastStatus=value;
      }
    }))
  }

  getSeedsApplicants(state: string): void{
    this.loadingtable = true;
    let filter:SeedFilter = {
      status:state,
      viewPage: 'applicant'
    }
    this.applicantService.listSeedsAll(filter).subscribe(
      (data) => {
        this.data = data;
        this.loadingtable = false;
      }
    );
  }

  getPendingSeeds(): void{
    this.loadingtable = true;
    this.applicantService.listPendingSeeds().subscribe(
      (data) => {
        this.data = data;
        this.loadingtable = false;
      }
    );
  }

  getRejectedSeeds(): void{
    this.loadingtable = true;
    this.applicantService.listRejectedSeeds().subscribe(
      (data) => {
        this.data = data;
        this.loadingtable = false;
      }
    );
  }

  afterClose(result){
    if (result){
      const value = this.val.get('state').value;
      this.getSeedsApplicants(value);
    }
  }
}
