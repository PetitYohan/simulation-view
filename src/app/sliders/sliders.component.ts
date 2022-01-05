import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  sliderValue;
  capteurs: string = '/assets/data/capteurs.geojson';
  @Input() idCapteur: number;
  constructor() {}

  ngOnInit() {
    this.sliderValue = 0;
  }

  valueChanged(e) {
    this.sliderValue = e.value;
  }
}
