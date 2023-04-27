import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalProcessSeedComponent } from './modal-process-seed.component';

describe('ModalProcessSeedComponent', () => {
  let component: ModalProcessSeedComponent;
  let fixture: ComponentFixture<ModalProcessSeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalProcessSeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalProcessSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
