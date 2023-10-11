import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {SouvenirTrackingService} from "../../../core/services/souvenir-tracking.service";
import {SeedSouvenirTracking} from "../../../core/models/Souvenir.model";

export interface DialogData {
  seedSouvenirTrackingId: string;
}

@Component({
  selector: 'app-souvenir-view',
  templateUrl: './souvenir-view.component.html',
  styleUrls: ['./souvenir-view.component.scss']
})
export class SouvenirViewComponent implements OnInit{
  loadingSouvenirTracking = false;
  seedSouvenirTracking: SeedSouvenirTracking = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: DialogData,
              private souvenirTrackingService: SouvenirTrackingService,
              public dialogRef: MatDialogRef<SouvenirViewComponent>) {
  }
  ngOnInit(): void {
    this.getSouvenirTracking();
  }
  getSouvenirTracking(){
    this.loadingSouvenirTracking = true;
    this.souvenirTrackingService.getSeedSouvenirTracking
    (this.data.seedSouvenirTrackingId)
      .subscribe((data: SeedSouvenirTracking)=>{
        this.seedSouvenirTracking = data;
        this.loadingSouvenirTracking = false;
      },(error => {
        this.loadingSouvenirTracking = false;
      }))

  }
}
