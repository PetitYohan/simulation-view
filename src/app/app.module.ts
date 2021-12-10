import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [MarkerService],
  declarations: [AppComponent, MapComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
