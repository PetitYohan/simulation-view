import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { HttpClientModule } from '@angular/common/http';
import { MarkerService } from './marker.service';
import { PopupService } from './popup.service';

@NgModule({
  imports: [BrowserModule, FormsModule, HttpClientModule],
  providers: [MarkerService, PopupService],
  declarations: [AppComponent, MapComponent],
  bootstrap: [AppComponent],
})
export class AppModule {}
