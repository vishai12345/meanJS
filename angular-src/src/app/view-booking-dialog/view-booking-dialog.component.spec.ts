import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewBookingDialogComponent } from './view-booking-dialog.component';

describe('ViewBookingDialogComponent', () => {
  let component: ViewBookingDialogComponent;
  let fixture: ComponentFixture<ViewBookingDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ViewBookingDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ViewBookingDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
