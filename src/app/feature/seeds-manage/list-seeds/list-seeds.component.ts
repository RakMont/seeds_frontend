import { Component, OnInit } from '@angular/core';
import {CellContent, CellParam, Table} from "../../../core/models/Table.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../core/services/auth.service";
import {ApplicantService} from "../../../core/services/applicant.service";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {ModalViewSeedComponent} from "../modal-view-seed/modal-view-seed.component";
import {FormBuilder} from "@angular/forms";
import {ModalEditSeedComponent} from "../modal-edit-seed/modal-edit-seed.component";
import {ModalUnactiveSeedComponent} from "../modal-unactive-seed/modal-unactive-seed.component";
import {SeedFilter} from "../../../core/models/Seed.model";

@Component({
  selector: 'app-list-seeds',
  templateUrl: './list-seeds.component.html',
  styleUrls: ['./list-seeds.component.scss']
})
export class ListSeedsComponent implements OnInit {
  loadingTable = true;
  lastStatus = '';
  data: Table;
  val = this.formBuilder.group({
    state: ['ACCEPTED']
  });
  volunteerProcess: string;
  constructor(private router: Router,
              private dialog: MatDialog,
              private matSnackBar: MatSnackBar,
              private authService: AuthService,
              private formBuilder: FormBuilder,
              private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.valueChanges();
    //this.getPendingSeeds();
    this.getCurrentUser();
    this.val.patchValue({state: 'ACCEPTED'});
  }

  getCurrentUser(){
    this.authService.getCurrentUser()
      .subscribe((data) =>{
        console.log('getCurrentUser', data);
        this.volunteerProcess = data.volunterId;
      })
  }
  getApprovedSeeds(state): void{
    this.loadingTable = true;
    let filter:SeedFilter = {
      status:state
    }
    this.applicantService.listConfirmedSeeds(filter).subscribe(
      (data) => {
        this.data = data;
        this.loadingTable = false;
      }
    );
  }
  onDeactivate(applicantId: string): void {
    const dialogConfig =  this.dialog.open(ModalUnactiveSeedComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '600px',
      data: {
        contributorId: applicantId,
        volunteerId: this.volunteerProcess,
        isReject: true
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result){
        this.getApprovedSeeds(this.val.get('state').value);
      }
    });
  }
  valueChanges(){
    this.val.get('state').valueChanges.subscribe((value => {
      if(value && value!=this.lastStatus){
        this.getApprovedSeeds(value);
        this.lastStatus=value;
      }
    }))
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
  actionOutput(event: CellContent): void{
    const id = this.getSeedId(event.params);
    console.log('actionOutput',event.clickedAction )
    if (event.clickedAction === 'EditContr'){
      this.onEditSeed(id);
    }else if (event.clickedAction === 'Unactive'){
      this.onDeactivate(id);
    } else if (event.clickedAction === 'SeedInfo'){
      this.onView(id);
    }
  }
  onEditSeed(applicantId): void {
    const dialogConfig =  this.dialog.open(ModalEditSeedComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        contributorId: applicantId,
        volunteerId: this.volunteerProcess,
        isReject: false
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result){
        this.getApprovedSeeds(this.val.get('state').value);
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
}
