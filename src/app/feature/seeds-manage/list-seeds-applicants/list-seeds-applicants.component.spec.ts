import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeedsApplicantsComponent } from './list-seeds-applicants.component';

describe('ListSeedsApplicantsComponent', () => {
  let component: ListSeedsApplicantsComponent;
  let fixture: ComponentFixture<ListSeedsApplicantsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSeedsApplicantsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSeedsApplicantsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
