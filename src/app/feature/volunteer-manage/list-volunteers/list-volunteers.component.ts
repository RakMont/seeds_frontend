import {Component, OnInit} from '@angular/core';
import {CellContent, CellParam, Table} from '../../../core/models/Table.model';
import {Router} from '@angular/router';
import {MatDialog} from "@angular/material/dialog";
import {FormBuilder} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {VolunterDialogComponent} from "../volunter-dialog/volunter-dialog.component";
import {VolunterDetailsComponent} from "../volunter-details/volunter-details.component";
import {MessageSnackBarComponent} from "../../../shared/message-snack-bar/message-snack-bar.component";
import {ExitElementComponent} from "../../../shared/exit-element/exit-element.component";
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import {UpdatePasswordComponent} from "../update-password/update-password.component";

@Component({
  selector: 'app-list-volunteers',
  templateUrl: './list-volunteers.component.html',
  styleUrls: ['./list-volunteers.component.scss']
})
export class ListVolunteersComponent implements OnInit {
  volunteers: Table;
  loadingVolunteers = true;
  lastStatus = '';
  val = this.formBuilder.group({
    state: [null]
  });
  constructor(private router: Router,
              private voluntersService: VolunteerService,
              private dialog: MatDialog,
              private formBuilder: FormBuilder,
              private matSnackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.valuechanges();
    this.val.patchValue({state: 'ACTIVE'});
  }

  getActiveVolunters(state): void{
    this.loadingVolunteers = true;
    this.voluntersService.listVolunteers(state)
      .subscribe(data => {
        this.volunteers = data;
        this.loadingVolunteers = false;
      }, ( error ) => {
        this.loadingVolunteers = false;
      });
  }

  oneUpdate(volunterid: any): void {
    const dialogRef = this.dialog.open(VolunterDialogComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        volunterId: volunterid,
        edit: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.getActiveVolunters(this.val.get('state').value); }
    });
  }

  onAdding(): void {
    // this.voluntersService.formData = volunter;
    const dialogRef = this.dialog.open(VolunterDialogComponent, {
      disableClose: false,
      autoFocus: true,
      panelClass: 'icon-outside',
      width: '800px',
      data: {
        volunterId: null,
        edit: false
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) { this.getActiveVolunters(this.val.get('state').value); }
    });
  }

  onview(volunterId): void {
    const dialogRef = this.dialog.open(VolunterDetailsComponent, {
      disableClose: false,
      autoFocus: true,
      panelClass: 'icon-outside',
      width: '800px',
      data: {
        volunteerId: volunterId,
        edit: false
      }
    });
  }
  inactiveVolunter(volunterId): void {
    const dialogRef = this.dialog.open(ExitElementComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '500px',
      data: {
        title: 'DESACTIVAR RESPONSABLE',
        question: 'Al confirmar se desativará al responsable y solo ' +
          'podrá verlo en el menú de responsables desactivados,' +
          ' ¿ Está seguro de desactivarlo ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.status === 'afirmative'){
        const payload = {
          message: result.message,
          volunteerId: volunterId
        };
        this.voluntersService.exitVolunteer(payload)
          .subscribe(( result ) => {
            this.showMessage(result);
            if (result) { this.getActiveVolunters(this.val.get('state').value); }
          });
      }
    });
  }

  reactivateVolunter(volunterId): void {
    const dialogRef = this.dialog.open(ExitElementComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '500px',
      data: {
        isDelete: true,
        title: 'REACTIVAR RESPONSABLE',
        question: 'Al confirmar se reactivará al voluntario y' +
          ' podrá verlo en el menú de responsables activados,' +
          ' ¿ Está seguro de reactivarlo ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.status === 'afirmative'){
        const payload = {
          message: result.message,
          volunteerId: volunterId
        };
        this.voluntersService.activateVolunteer(payload)
          .subscribe(( result ) => {
            this.showMessage(result);
            if (result) { this.getActiveVolunters(this.val.get('state').value); }
          });
      }
    });
  }
  outputEvent(event: CellContent): void{
    console.log('event', event);
    const id = this.getVolunteerId(event.params);
    if (event.clickedAction === 'editVolunter'){
      this.oneUpdate(id);
    } else if (event.clickedAction === 'seeVolunter'){
      this.onview(id);
    } else if (event.clickedAction === 'inactiveVolunter'){
      this.inactiveVolunter(id);
    } else  if (event.clickedAction === 'deleteVolunter'){
      this.onDelete(id);
    }else  if (event.clickedAction === 'activateVolunter') {
      this.reactivateVolunter(id);
    } else  if (event.clickedAction === 'updatePassword') {
      this.updateVolunteerPassword(id);
    }
  }

  updateVolunteerPassword(volunteerId:string): void {
    const dialogRef = this.dialog.open(UpdatePasswordComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '800px',
      data: {
        volunterId: volunteerId,
        edit: true
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('result', result)
      if (result==='success') { this.getActiveVolunters(this.val.get('state').value); }
    });
  }
  onDelete(id): void {
    const dialogRef = this.dialog.open(ExitElementComponent, {
      disableClose: false,
      panelClass: 'icon-outside',
      autoFocus: true,
      width: '500px',
      data: {
        isDelete: true,
        title: 'ELIMINAR RESPONSABLE',
        question: 'Al confirmar se eliminará al responsable y todos los registro relacionados ' +
          ' ¿ Está seguro de eliminarlo ?'
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result?.status === 'afirmative'){
        this.voluntersService.deleteVolunteer(id)
          .subscribe(( res ) => {
            this.showMessage(res);
            if (res) { this.getActiveVolunters(this.val.get('state').value); }
          }, ( error ) => {
            console.log(error);
            this.showMessage(error.error);
          });
      }
    });
  }

  getVolunteerId(params: CellParam[]): string{
    return params.find(p => p.paramName === 'volunterId').paramContent;
  }

  showMessage(data: any): void{
    console.log('showMessage', data);
    this.matSnackBar.openFromComponent(MessageSnackBarComponent, {
      data: { data },
      duration: 5000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: 'snack-style'
    });
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
      PDF.save('angular-demo.pdf');
    });
  }

  valuechanges(){
    this.val.get('state').valueChanges.subscribe((value => {
      if(value && value!=this.lastStatus){
        this.getActiveVolunters(value);
        this.lastStatus=value;
      }/*else{
        this.val.patchValue({state: 'ACTIVE'});
      }*/
    }))
  }
}
