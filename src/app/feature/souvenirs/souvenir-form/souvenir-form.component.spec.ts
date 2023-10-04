import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirFormComponent } from './souvenir-form.component';

describe('SouvenirFormComponent', () => {
  let component: SouvenirFormComponent;
  let fixture: ComponentFixture<SouvenirFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouvenirFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouvenirFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
