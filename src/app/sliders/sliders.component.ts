import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  sliderValue = 0;
  valeurs = [0, 1, 2, 3];
  constructor() {}

  ngOnInit() {}

  readSlider(event) {
    console.error(event);
  }
}
