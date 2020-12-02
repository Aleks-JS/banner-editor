import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ParameterFormsComponent } from './parameter-forms.component';

describe('ParameterFormsComponent', () => {
  let component: ParameterFormsComponent;
  let fixture: ComponentFixture<ParameterFormsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ParameterFormsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ParameterFormsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
