import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { BehaviorSubject, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParametersService } from 'src/app/services/parameters.service';

@Component({
  selector: 'app-parameter-forms',
  templateUrl: './parameter-forms.component.html',
  styleUrls: ['./parameter-forms.component.scss']
})
export class ParameterFormsComponent implements OnInit {

  parameterForm = this.fb.group({
    width: [282],
    height: [376],
    bgImage: [null],
    bgColor: [null],
    bgGradient: this.fb.group({
      from: [null],
      to: [null],
      direction: [null]
    }),
    text: [null],
    link: [null]
  })

  destroyed$ = new Subject()

  constructor(private fb: FormBuilder, private parametersService: ParametersService) { }

  ngOnInit(): void {
    this.parameterForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(e => {
      this.parametersService.setWidth(e.horizontalSize)
      this.parametersService.setHeight(e.verticalSize)
      console.log(this.parameterForm)
    })
  }

  ngOnDestroy(): void {
    this.destroyed$.next()
    this.destroyed$.complete()
  }


}
