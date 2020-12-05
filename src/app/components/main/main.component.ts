import { Component, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { ParametersService } from 'src/app/services/parameters.service';

const INIT_WIDTH_PREVIEW: number = 282
const INIT_HEIGHT_PREVIEW: number = 376

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {

  parameterForm = this.fb.group({
    width: [INIT_WIDTH_PREVIEW],
    height: [INIT_HEIGHT_PREVIEW],
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

  dynamicStyle = {
    width: `${this.parameterForm.get('width').value}px`,
    height: `${this.parameterForm.get('height').value}px`
  }

  destroyed$ = new Subject()

  constructor(private fb: FormBuilder, private parametersService: ParametersService) { }

  ngOnInit(): void {
    this.parameterForm.valueChanges.subscribe(e => {
      console.log(e)
    })
    //   this.parameterForm.valueChanges.pipe(takeUntil(this.destroyed$)).subscribe(e => {
    //     this.parametersService.setWidth(e.horizontalSize)
    //     this.parametersService.setHeight(e.verticalSize)
    // })
  }

  ngOnDestroy(): void {
    // this.destroyed$.next()
    // this.destroyed$.complete()
  }


}


