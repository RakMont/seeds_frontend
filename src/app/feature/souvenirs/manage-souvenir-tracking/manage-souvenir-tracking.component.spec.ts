import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageSouvenirTrackingComponent } from './manage-souvenir-tracking.component';

describe('SouvenirTrackingManageComponent', () => {
  let component: ManageSouvenirTrackingComponent;
  let fixture: ComponentFixture<ManageSouvenirTrackingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageSouvenirTrackingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageSouvenirTrackingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
