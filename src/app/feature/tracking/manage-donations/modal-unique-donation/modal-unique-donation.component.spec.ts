import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUniqueDonationComponent } from './modal-unique-donation.component';

describe('ModalUniqueDonationComponent', () => {
  let component: ModalUniqueDonationComponent;
  let fixture: ComponentFixture<ModalUniqueDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUniqueDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUniqueDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
