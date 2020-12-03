import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-parameter-forms',
  templateUrl: './parameter-forms.component.html',
  styleUrls: ['./parameter-forms.component.scss']
})
export class ParameterFormsComponent implements OnInit {

  parameterForm = this.fb.group({
    bgImage: ['загрузить изображение'],
    bgColor: ['выбрать цвет фона'],
    bgGradient: ['выбрать градиент фона'],
    text: ['введите текст'],
    url: ['введите url']
  })

  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
  }

}
