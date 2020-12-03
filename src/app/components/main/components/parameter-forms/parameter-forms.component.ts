import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

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

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
