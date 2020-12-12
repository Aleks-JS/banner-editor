import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MainComponent } from './components/main/main.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ColorPickerModule } from 'ngx-color-picker';
import { MatRippleModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MaterialFileInputModule } from 'ngx-material-file-input';
import { ClipboardModule } from 'ngx-clipboard';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [AppComponent, MainComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    ColorPickerModule,
    ClipboardModule,
    DragDropModule,
    BrowserAnimationsModule,
    MatRippleModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatToolbarModule,
    MatIconModule,
    MaterialFileInputModule,
    MatCheckboxModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
