import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewActivitieComponent } from './modal-view-activitie.component';

describe('ModalViewActivitieComponent', () => {
  let component: ModalViewActivitieComponent;
  let fixture: ComponentFixture<ModalViewActivitieComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewActivitieComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewActivitieComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
