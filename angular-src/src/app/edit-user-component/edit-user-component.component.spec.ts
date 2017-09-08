import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditUserComponentComponent } from './edit-user-component.component';

describe('EditUserComponentComponent', () => {
  let component: EditUserComponentComponent;
  let fixture: ComponentFixture<EditUserComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditUserComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditUserComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
