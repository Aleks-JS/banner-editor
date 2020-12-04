import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ParametersService {

  width$ = new Subject<number>()
  height$ = new Subject<number>()

  constructor() { }

  setWidth(formValue: string) {
    return this.width$.next(parseInt(formValue))
  }

  setHeight(formValue: string) {
    return this.height$.next(parseInt(formValue))
  }

}
