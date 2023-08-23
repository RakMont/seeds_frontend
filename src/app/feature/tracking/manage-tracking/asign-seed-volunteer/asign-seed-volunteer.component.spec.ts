import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AsignSeedVolunteerComponent } from './asign-seed-volunteer.component';

describe('AsignSeedVolunteerComponent', () => {
  let component: AsignSeedVolunteerComponent;
  let fixture: ComponentFixture<AsignSeedVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AsignSeedVolunteerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AsignSeedVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
