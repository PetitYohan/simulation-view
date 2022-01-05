import { Component, Input, OnInit } from '@angular/core';
import capteurs from './capteurs.json';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  sliderValue;
  capteurIntensity: any;
  capteurs: string = '/assets/data/capteurs.geojson';
  @Input() idCapteur: number;
  constructor() {
    this.capteurIntensity = capteurs;
  }

  ngOnInit() {
    this.sliderValue = 0;
  }

  valueChanged(e) {
    this.sliderValue = e.value;
  }
}
