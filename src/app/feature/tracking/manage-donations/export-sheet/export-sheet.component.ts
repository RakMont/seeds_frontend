import { Component } from '@angular/core';
import {MatBottomSheetRef} from "@angular/material/bottom-sheet";

@Component({
  selector: 'app-export-sheet',
  templateUrl: './export-sheet.component.html',
  styleUrls: ['./export-sheet.component.scss']
})
export class ExportSheetComponent {
  constructor(private _bottomSheetRef: MatBottomSheetRef<ExportSheetComponent>) {}
  openLink(event: String): void {
    this._bottomSheetRef.dismiss(event);
    //event.preventDefault();
  }
}
