import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalDonationComponent } from './modal-donation.component';

describe('ModalDonationComponent', () => {
  let component: ModalDonationComponent;
  let fixture: ComponentFixture<ModalDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
