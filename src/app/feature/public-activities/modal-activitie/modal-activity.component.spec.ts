import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalActivityComponent } from './modal-activity.component';

describe('ModalActivitieComponent', () => {
  let component: ModalActivityComponent;
  let fixture: ComponentFixture<ModalActivityComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalActivityComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalActivityComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
