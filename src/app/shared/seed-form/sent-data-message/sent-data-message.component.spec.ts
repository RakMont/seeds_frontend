import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SentDataMessageComponent } from './sent-data-message.component';

describe('SentDataMessageComponent', () => {
  let component: SentDataMessageComponent;
  let fixture: ComponentFixture<SentDataMessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SentDataMessageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SentDataMessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
