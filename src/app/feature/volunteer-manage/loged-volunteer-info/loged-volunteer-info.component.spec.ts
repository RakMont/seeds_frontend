import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LogedVolunteerInfoComponent } from './loged-volunteer-info.component';

describe('LogedVolunteerInfoComponent', () => {
  let component: LogedVolunteerInfoComponent;
  let fixture: ComponentFixture<LogedVolunteerInfoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LogedVolunteerInfoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LogedVolunteerInfoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
