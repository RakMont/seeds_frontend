import { Component, OnInit } from '@angular/core';
import {CellContent, CellParam, Table} from "../../../core/models/Table.model";
import {Router} from "@angular/router";
import {MatDialog} from "@angular/material/dialog";
import {MatSnackBar} from "@angular/material/snack-bar";
import {AuthService} from "../../../core/services/auth.service";
import {ApplicantService} from "../../../core/services/applicant.service";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {ModalProcessSeedComponent} from "../modal-process-seed/modal-process-seed.component";
import {ModalViewSeedComponent} from "../modal-view-seed/modal-view-seed.component";

@Component({
  selector: 'app-list-seeds',
  templateUrl: './list-seeds.component.html',
  styleUrls: ['./list-seeds.component.scss']
})
export class ListSeedsComponent implements OnInit {
  loadingtable = true;
  data: Table;

  volunteerProcess: string;
  constructor(private router: Router,
              private dialog: MatDialog,
              private matSnackBar: MatSnackBar,
              private authService: AuthService,
              private applicantService: ApplicantService) { }

  ngOnInit(): void {
    this.getPendingSeeds();
    this.getCurrentUser();
  }

  getCurrentUser(){
    this.authService.getCurrentUser()
      .subscribe((data) =>{
        console.log('aksjdhkasjdh', data);
        this.volunteerProcess = data.volunterId;
      })
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
  onReject(applicantId: string): void {
    const dialogConfig =  this.dialog.open(ModalProcessSeedComponent, {
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
        this.getPendingSeeds();
      }
    });
  }

  onAcept(applicantId): void {
    const dialogConfig =  this.dialog.open(ModalProcessSeedComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '600px',
      data: {
        contributorId: applicantId,
        volunteerId: this.volunteerProcess,
        isReject: false
      }
    });
    dialogConfig.afterClosed().subscribe(result => {
      if (result){
        this.getPendingSeeds();
      }
    });
  }

  onView(id): void{
    const dialogConfig =  this.dialog.open(ModalViewSeedComponent, {
      disableClose: false,
      autoFocus: true,
      width: '700px',
      data: {
        contributorId: id,
      }
    });
  }
  actionOutput(event: CellContent): void{
    const id = this.getSeedId(event.params);
    if (event.clickedAction === 'AceptSeed'){
      this.onAcept(id);
    }else if (event.clickedAction === 'RejectSeed'){
      this.onReject(id);
    } else if (event.clickedAction === 'SeedInfo'){
      this.onView(id);
    }
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
