import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalViewSeedComponent } from './modal-view-seed.component';

describe('ModalViewSeedComponent', () => {
  let component: ModalViewSeedComponent;
  let fixture: ComponentFixture<ModalViewSeedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ModalViewSeedComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ModalViewSeedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
