import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VolunterDialogComponent } from './volunter-dialog.component';

describe('VolunterDialogComponent', () => {
  let component: VolunterDialogComponent;
  let fixture: ComponentFixture<VolunterDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VolunterDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VolunterDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
