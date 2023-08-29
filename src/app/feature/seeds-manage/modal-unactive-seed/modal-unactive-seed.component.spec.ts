import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalUnactiveSeedComponent } from './modal-unactive-seed.component';

describe('ModalUnactiveSeedComponent', () => {
  let component: ModalUnactiveSeedComponent;
  let fixture: ComponentFixture<ModalUnactiveSeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalUnactiveSeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalUnactiveSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
