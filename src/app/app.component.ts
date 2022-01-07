import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import capteurs from '../assets/data/capteurs.json';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  idCapteur: number;
  slide = false;
  capteursData: any;
  totalAngularPackages;
  idValue;
  intensityValue;

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private httpClient: HttpClient
  ) {
    this.capteursData = capteurs;
    this.matIconRegistry.addSvgIcon(
      'map',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/map-marked-alt-solid.svg'
      )
    );
    this.matIconRegistry.addSvgIcon(
      'wrench',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/wrench-solid.svg'
      )
    );
  }

  sliderToggle() {
    this.slide = !this.slide;
    this.httpClient.get('http://localhost:8000/test').subscribe((data) => {
      this.totalAngularPackages = data;
    });
    console.log(this.totalAngularPackages);
    this.idValue = this.totalAngularPackages.capteurs.id;
    this.intensityValue = this.totalAngularPackages.capteurs.intensity;
  }

  capteurChangedHandler(c) {
    console.log(c);
  }
}
