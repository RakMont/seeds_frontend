import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageDonationsComponent } from './manage-donations.component';

describe('ManageDonationsComponent', () => {
  let component: ManageDonationsComponent;
  let fixture: ComponentFixture<ManageDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ManageDonationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ManageDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
