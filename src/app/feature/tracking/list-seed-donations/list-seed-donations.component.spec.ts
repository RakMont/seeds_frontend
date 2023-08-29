import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeedDonationsComponent } from './list-seed-donations.component';

describe('ListSeedDonationsComponent', () => {
  let component: ListSeedDonationsComponent;
  let fixture: ComponentFixture<ListSeedDonationsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSeedDonationsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSeedDonationsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
