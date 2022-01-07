import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  sliderValue;
  @Input() capteursData: any;
  @Output() capteursChange: EventEmitter<any> = new EventEmitter();
  c = {
    coordinates: [4.9, 45.71],
    id: 60,
    intensity: 7,
  }; //Temporaire remonter l'id marker clicked

  idCapteur: number;
  constructor(private markerService: MarkerService) {}

  ngOnInit() {
    this.sliderValue = 0;
  }

  update() {
    this.capteursChange.emit(this.capteursData);
  }

  valueChanged(e) {
    this.sliderValue = e.value;
    for (const c of this.capteursData) {
      if (c.id == this.idCapteur) {
        c.intensity = this.sliderValue;
      }
    }
    this.update();
    this.markerService.updateCircleMarkers(this.markerService.map, this.idCapteur, this.sliderValue);
  }

  @HostListener('document:click', ['$event'])
  documentClick(event: MouseEvent) {
    this.idCapteur = this.markerService.idClick;
    for (const c of this.capteursData) {
      if (c.id == this.idCapteur) {
        this.sliderValue = c.intensity;
      }
    }
  }
}
