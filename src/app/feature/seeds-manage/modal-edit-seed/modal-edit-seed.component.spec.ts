import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalEditSeedComponent } from './modal-edit-seed.component';

describe('ModalEditSeedComponent', () => {
  let component: ModalEditSeedComponent;
  let fixture: ComponentFixture<ModalEditSeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalEditSeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalEditSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
