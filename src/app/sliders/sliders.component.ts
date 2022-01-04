import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  sliderValue;
  constructor() {}

  ngOnInit() {
    this.sliderValue = 0;
  }

  valueChanged(e) {
    this.sliderValue = e.value;
  }
}
