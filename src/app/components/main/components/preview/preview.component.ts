import { Subject } from 'rxjs';
import { ParametersService } from 'src/app/services/parameters.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-preview',
  templateUrl: './preview.component.html',
  styleUrls: ['./preview.component.scss']
})
export class PreviewComponent implements OnInit {

  dynamicStyle = {
    width: '282px',
    height: '376px'
  }

  constructor(private parametersService: ParametersService) { }

  ngOnInit(): void {
    this.parametersService.width$.subscribe(val => this.dynamicStyle.width = `${val}px`)
    this.parametersService.height$.subscribe(val => this.dynamicStyle.height = `${val}px`)
  }

}
