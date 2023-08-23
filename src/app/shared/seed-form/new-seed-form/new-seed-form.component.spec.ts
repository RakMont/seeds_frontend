import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSeedFormComponent } from './new-seed-form.component';

describe('NewSeedFormComponent', () => {
  let component: NewSeedFormComponent;
  let fixture: ComponentFixture<NewSeedFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSeedFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NewSeedFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
