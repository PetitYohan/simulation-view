import { Component, HostListener, Input, OnInit } from '@angular/core';
import capteurs from '../../assets/data/capteurs.json';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  sliderValue;
  capteursData: any;
  idCapteur: number;
  constructor(private markerService: MarkerService) {}

  ngOnInit() {
    this.sliderValue = 0;
  }

  valueChanged(e) {
    this.sliderValue = e.value;
    for (const c of this.capteursData.capteurs) {
      if (c.id == this.idCapteur) {
        c.intensity = this.sliderValue;
      }
    }
    //modifier json // passer par un array au lieu du json, juste le charger au démarrage
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    this.idCapteur = this.markerService.idClick;
    this.capteursData = capteurs;
    for (const c of this.capteursData.capteurs) {
      if (c.id == this.idCapteur) {
        this.sliderValue = c.intensity;
      }
    }
    console.log(this.sliderValue);
  }
}
