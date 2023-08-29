import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListVolunteersComponent } from './list-volunteers.component';

describe('ListVolunteersComponent', () => {
  let component: ListVolunteersComponent;
  let fixture: ComponentFixture<ListVolunteersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListVolunteersComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListVolunteersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
