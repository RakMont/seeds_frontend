import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageTrackingComponent } from './manage-tracking.component';

describe('ManageTrackingComponent', () => {
  let component: ManageTrackingComponent;
  let fixture: ComponentFixture<ManageTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
