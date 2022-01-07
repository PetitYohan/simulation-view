import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';
import capteurs from '../assets/data/capteurs.json';
import { Capteur } from './capteur';
import { MarkerService } from './marker.service';

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
  getCapteursValue: Capteur[] = [
    { id: 0, intensity: 0 },
    { id: 1, intensity: 0 },
    { id: 2, intensity: 0 },
    { id: 3, intensity: 0 },
  ];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private httpClient: HttpClient,
    private markerService: MarkerService
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
    this.matIconRegistry.addSvgIcon(
      'fire',
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        '../assets/icons/fire-solid.svg'
      )
    );
    setInterval(function () {
      this.onActualisation();
    }, 15000);
  }

  sliderToggle() {
    this.slide = !this.slide;
  }

  getCapteurs() {
    this.httpClient
      .get('http://localhost:8000/getCapteurs')
      .subscribe((data) => {
        this.totalAngularPackages = data;
      });
    console.log(this.totalAngularPackages);
    for (let i = 0; i < 4; i++) {
      this.getCapteursValue[i].id = this.totalAngularPackages.capteurs[i].id;
      this.getCapteursValue[i].intensity =
        this.totalAngularPackages.capteurs[i].intensity;
    }
  }

  capteurChangedHandler(c) {
    console.log(c);
  }

  //trouver le moyen d'actualiser la page toute les X sec
  onActualisation() {
    this.getCapteurs();
    for (let i = 0; i <= 3; i++) {
      this.markerService.updateCircleMarkers(
        this.markerService.map,
        this.getCapteursValue[i].id,
        this.getCapteursValue[i].intensity
      );
    }
  }
}
