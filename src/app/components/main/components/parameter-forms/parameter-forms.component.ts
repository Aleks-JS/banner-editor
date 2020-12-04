import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject } from 'rxjs';
import { ParametersService } from 'src/app/services/parameters.service';

@Component({
  selector: 'app-parameter-forms',
  templateUrl: './parameter-forms.component.html',
  styleUrls: ['./parameter-forms.component.scss']
})
export class ParameterFormsComponent implements OnInit {

  parameterForm = this.fb.group({
    horizontalSize: ['282'],
    verticalSize: ['376'],
    bgImageLocal: [''],
    bgImageUrl: [''],
    bgColor: [''],
    bgGradient: [''],
    text: [''],
    url: ['']
  })

  width$ = new BehaviorSubject(this.parameterForm.controls['horizontalSize'].value)
  height$ = new BehaviorSubject(this.parameterForm.controls['verticalSize'].value)

  constructor(private fb: FormBuilder, private parametersService: ParametersService) { }

  ngOnInit(): void {
  }

  onChangeWidth() {
    this.width$.next(this.parameterForm.controls['horizontalSize'].value)
    this.width$.subscribe(e => this.parametersService.setWidth(e))
  }

  onChangeHeight() {
    this.height$.next(this.parameterForm.controls['verticalSize'].value)
    this.height$.subscribe(e => this.parametersService.setHeight(e))
  }

}
