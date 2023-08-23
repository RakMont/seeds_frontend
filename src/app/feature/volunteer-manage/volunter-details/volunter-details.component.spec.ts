import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunterDetailsComponent } from './volunter-details.component';

describe('VolunterDetailsComponent', () => {
  let component: VolunterDetailsComponent;
  let fixture: ComponentFixture<VolunterDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunterDetailsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunterDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
