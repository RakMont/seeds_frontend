import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SouvenirViewComponent } from './souvenir-view.component';

describe('SouvenirViewComponent', () => {
  let component: SouvenirViewComponent;
  let fixture: ComponentFixture<SouvenirViewComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SouvenirViewComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SouvenirViewComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
