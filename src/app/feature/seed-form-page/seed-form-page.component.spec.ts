import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SeedFormPageComponent } from './seed-form-page.component';

describe('SeedFormPageComponent', () => {
  let component: SeedFormPageComponent;
  let fixture: ComponentFixture<SeedFormPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SeedFormPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SeedFormPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
