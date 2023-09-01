import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnterpriseDonationComponent } from './enterprise-donation.component';

describe('EnterpriseDonationComponent', () => {
  let component: EnterpriseDonationComponent;
  let fixture: ComponentFixture<EnterpriseDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnterpriseDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EnterpriseDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
