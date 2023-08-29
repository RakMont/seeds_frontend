import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PublicActivitiesComponent } from './public-activities.component';

describe('PublicActivitiesComponent', () => {
  let component: PublicActivitiesComponent;
  let fixture: ComponentFixture<PublicActivitiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PublicActivitiesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PublicActivitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
