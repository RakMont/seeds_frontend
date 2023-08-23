import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSeedFromVolunteerComponent } from './new-seed-from-volunteer.component';

describe('NewSeedFormComponent', () => {
  let component: NewSeedFromVolunteerComponent;
  let fixture: ComponentFixture<NewSeedFromVolunteerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSeedFromVolunteerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSeedFromVolunteerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
