import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitElementComponent } from './exit-element.component';

describe('ExitElementComponent', () => {
  let component: ExitElementComponent;
  let fixture: ComponentFixture<ExitElementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitElementComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExitElementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
