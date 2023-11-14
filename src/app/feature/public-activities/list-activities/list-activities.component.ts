import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
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
  @Input() canTakeActions: boolean;
  @Output() chosenAction: EventEmitter<{action: string, activityId: string}> = new EventEmitter();

  constructor(private dialog: MatDialog,
              private activityService: ActivitiesService) {
  }
  ngOnInit(): void {
  }

  actionEvent(action: string, activityId: string){
    this.chosenAction.emit({action, activityId})
  }

}
