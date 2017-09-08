import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FotterComponentComponent } from './fotter-component.component';

describe('FotterComponentComponent', () => {
  let component: FotterComponentComponent;
  let fixture: ComponentFixture<FotterComponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FotterComponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FotterComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
