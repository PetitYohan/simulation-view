import { HttpClient } from "@angular/common/http";
import { Component } from "@angular/core";
import { MatIconRegistry } from "@angular/material/icon";
import { DomSanitizer } from "@angular/platform-browser";
import capteurs from "../assets/data/capteurs.json";
import { Capteur } from "./capteur";
import { Feu } from "./feu";
import { MarkerService } from "./marker.service";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"],
})
export class AppComponent {
  idCapteur: number;
  slide = false;
  capteursData: any;
  response;
  responseF: Feu[];
  getCapteursValue: Capteur[] = [
    { id: 0, intensity: 0 },
    { id: 1, intensity: 0 },
    { id: 2, intensity: 0 },
    { id: 3, intensity: 0 },
  ];
  getFeuxValue: Feu[] = [{ id: 0, intensity: 0, positionX: 0, positionY: 0 }];

  constructor(
    private matIconRegistry: MatIconRegistry,
    private domSanitizer: DomSanitizer,
    private httpClient: HttpClient,
    private markerService: MarkerService
  ) {
    this.capteursData = capteurs;
    this.matIconRegistry.addSvgIcon(
      "map",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/map-marked-alt-solid.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "wrench",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/wrench-solid.svg"
      )
    );
    this.matIconRegistry.addSvgIcon(
      "fire",
      this.domSanitizer.bypassSecurityTrustResourceUrl(
        "../assets/icons/fire-solid.svg"
      )
    );
    setInterval(() => this.onActualisation(), 15000);
  }

  sliderToggle() {
    this.slide = !this.slide;
  }

  getCapteurs() {
    this.httpClient
      .get("http://localhost:8000/getCapteurs")
      .subscribe((data) => {
        this.response = data;
      });
    for (let i = 0; i < 4; i++) {
      this.getCapteursValue[i].id = this.response.capteurs[i].id;
      this.getCapteursValue[i].intensity = this.response.capteurs[i].intensity;
      this.capteursData[this.response.capteurs[i].id - 1].intensity =
        this.response.capteurs[i].intensity;
    }
  }

  getFeux() {
    this.httpClient
      .get("http://localhost:8000/getFeux")
      .subscribe((data: any) => {
        this.responseF = data.feux;
      });
    if (typeof this.responseF !== "undefined") {
      for (const resp of this.responseF) {
        const feu = new Feu();
        feu.id = resp.id;
        feu.intensity = resp.intensity;
        feu.positionX = resp.positionX;
        feu.positionY = resp.positionY;
        this.getFeuxValue.push(feu);
        console.log("j'ajoute un feu");
        this.markerService.updateFeu(this.getFeuxValue, resp);
      }
    } else {
      console.log("je récupère du vide");
      console.log(this.responseF);
    }
  }

  capteurChangedHandler(c) {
    console.log(c);
  }

  onActualisation(): any {
    this.getCapteurs();
    for (let i = 0; i <= 3; i++) {
      this.markerService.updateCircleMarkers(
        this.markerService.map,
        this.getCapteursValue[i].id,
        this.getCapteursValue[i].intensity
      );
    }
    this.getFeux();
  }
}
