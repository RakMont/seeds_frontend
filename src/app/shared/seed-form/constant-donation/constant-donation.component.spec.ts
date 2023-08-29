import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ConstantDonationComponent } from './constant-donation.component';

describe('ConstantDonationComponent', () => {
  let component: ConstantDonationComponent;
  let fixture: ComponentFixture<ConstantDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ConstantDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ConstantDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
