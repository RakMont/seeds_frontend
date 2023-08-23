import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListTrackingSeedsComponent } from './list-tracking-seeds.component';

describe('ListTrackingSeedsComponent', () => {
  let component: ListTrackingSeedsComponent;
  let fixture: ComponentFixture<ListTrackingSeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListTrackingSeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListTrackingSeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
