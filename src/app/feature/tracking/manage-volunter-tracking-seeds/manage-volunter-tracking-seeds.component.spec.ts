import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageVolunterTrackingSeedsComponent } from './manage-volunter-tracking-seeds.component';

describe('ManageVolunterTrackingSeedsComponent', () => {
  let component: ManageVolunterTrackingSeedsComponent;
  let fixture: ComponentFixture<ManageVolunterTrackingSeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageVolunterTrackingSeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageVolunterTrackingSeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
