import { Component } from '@angular/core';
import { MatIconRegistry } from '@angular/material/icon';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  idCapteur: number;
  slide = false;
  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer
  ) {
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

  idCapteurHandler(val: number) {
    this.idCapteur = val;
    console.log(val);
  }

  sliderToggle() {
    this.slide = !this.slide;
  }
}
