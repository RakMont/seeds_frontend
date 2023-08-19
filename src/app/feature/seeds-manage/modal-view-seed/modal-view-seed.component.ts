import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {DialogData} from "../modal-process-seed/modal-process-seed.component";
import {ApplicantService} from "../../../core/services/applicant.service";

@Component({
  selector: 'app-modal-view-seed',
  templateUrl: './modal-view-seed.component.html',
  styleUrls: ['./modal-view-seed.component.scss']
})
export class ModalViewSeedComponent implements OnInit{
  seed: any;
  loadingSeed = true;
  constructor(public dialogRef: MatDialogRef<ModalViewSeedComponent>,
              @Inject(MAT_DIALOG_DATA) public data: DialogData,
              private applicantService: ApplicantService) {
  }
  ngOnInit(): void {
    this.getSeedById();
  }
  getSeedById(): void{
    this.applicantService.getSeedById(this.data.contributorId)
      .subscribe((seed) => {
        this.seed = seed;
        this.loadingSeed = false;

      });
  }
}
