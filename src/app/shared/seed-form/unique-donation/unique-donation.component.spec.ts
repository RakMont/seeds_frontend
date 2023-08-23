import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UniqueDonationComponent } from './unique-donation.component';

describe('UniqueDonationComponent', () => {
  let component: UniqueDonationComponent;
  let fixture: ComponentFixture<UniqueDonationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UniqueDonationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UniqueDonationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
