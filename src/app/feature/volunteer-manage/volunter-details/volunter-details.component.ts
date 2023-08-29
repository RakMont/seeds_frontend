import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Volunter} from "../../../core/models/Volunteer.model";
import {VolunteerService} from "../../../core/services/volunteer.service";
import {DialogData} from "../../seeds-manage/modal-process-seed/modal-process-seed.component";

@Component({
  selector: 'app-volunter-details',
  templateUrl: './volunter-details.component.html',
  styleUrls: ['./volunter-details.component.scss']
})
export class VolunterDetailsComponent implements OnInit {
  cargandoVoluntario = true;
  volunteer: Volunter;
  title: string;
  messageRoles = '';
  exitMessages = null;
  constructor(public dialogRef: MatDialogRef<VolunterDetailsComponent>,
              private volunterService: VolunteerService,
              @Inject(MAT_DIALOG_DATA) public data: DialogData) {
  }

  ngOnInit(): void {
    /*setTimeout(() => {
      this.getVolunter();
    }, 1000);*/
    this.getVolunter();
    this.getExitMessages();
  }

  getVolunter(): void {
    this.volunterService.getVolunteer(this.data.volunteerId).pipe()
      .subscribe((response) => {
        this.volunteer = response;
        this.cargandoVoluntario = false;
        this.messageRoles = this.volunteer.roles.length > 0 ? '' : 'No existen roles para este Voluntario';
        //console.log('this', this.messageRoles, this.volunter);
      });
  }

  getExitMessages(): void {
    this.volunterService.listVolunteerExitMessages(this.data.volunteerId)
      .subscribe((response)=>{
        this.exitMessages = response;
      console.log('response', response);
    })
  }
  close(): void {
    this.dialogRef.close();
  }
}
