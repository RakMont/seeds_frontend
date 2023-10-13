import {Component, Input, OnInit} from '@angular/core';
import {ActivityNewDTO} from "../../../core/models/Activity.model";
import {MatDialog} from "@angular/material/dialog";
import {ActivitiesService} from "../../../core/services/activities.service";

@Component({
  selector: 'app-list-activities',
  templateUrl: './list-activities.component.html',
  styleUrls: ['./list-activities.component.scss']
})
export class ListActivitiesComponent implements OnInit{
  @Input()activitiesList : ActivityNewDTO[];
  constructor(private dialog: MatDialog,
              private activityService: ActivitiesService) {
  }
  ngOnInit(): void {
  }

}
