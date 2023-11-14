import {Component, OnInit} from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import {AngularEditorConfig} from '@kolkov/angular-editor';
import {UntypedFormBuilder} from "@angular/forms";
import {TranslateService} from "@ngx-translate/core";
import {ActivitiesService} from "../../core/services/activities.service";
import {ActivityNewDTO} from "../../core/models/Activity.model";

@Component({
  selector: 'app-public-activities',
  templateUrl: './public-activities.component.html',
  styleUrls: ['./public-activities.component.scss']
})
export class PublicActivitiesComponent implements OnInit {
  public Editor = ClassicEditor;
  activitiesList : ActivityNewDTO[];

  previousLen = null;
  form = this.fb.group({
    htmlContent: [],
    currentLenguage: [null]
  });
  editorConfig: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '15rem',
    minHeight: '5rem',
    placeholder: 'Enter text here...',
    translate: 'no',
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
    ],
    customClasses: [
      {
        name: 'quote',
        class: 'quote',
      },
      {
        name: 'redText',
        class: 'redText'
      },
      {
        name: 'titleText',
        class: 'titleText',
        tag: 'h1',
      },
    ]
  };

  constructor(private fb: UntypedFormBuilder,
              private translate: TranslateService,
              private activityService: ActivitiesService) { }

  ngOnInit(): void {
    this.onChangeCurrentLen();
    this.getAllActivities();
  }

  onReady(evento){

  }
  htmlout(evento){
    console.log('htmlout', evento);
  }

  setCurrentLen(len: string){
    this.form.get('currentLenguage').setValue(len);
    return len;
  }

  onChangeCurrentLen(){
    this.form.get('currentLenguage').valueChanges.subscribe(
      (len) => {
        if (this.previousLen != len){
          this.previousLen=len;
          console.log('len change to', len);
        }
      }
    )
  }

  getAllActivities(){
    this.activityService.getAllActivities().subscribe((data)=>{
      this.activitiesList = data;
    },(error => {

    }))
  }
}
