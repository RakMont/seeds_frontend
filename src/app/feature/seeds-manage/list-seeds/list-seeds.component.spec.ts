import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSeedsComponent } from './list-seeds.component';

describe('ListSeedsComponent', () => {
  let component: ListSeedsComponent;
  let fixture: ComponentFixture<ListSeedsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSeedsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListSeedsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
