import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Capteur } from '../capteur';
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

  update() {
    this.capteursChange.emit(this.capteursData);
  }

  idCapteur: number;
  constructor(private markerService: MarkerService) {}

  ngOnInit() {
    this.sliderValue = 0;
  }

  valueChanged(e) {
    this.sliderValue = e.value;
    for (const c of this.capteursData) {
      if (c.id == this.idCapteur) {
        c.intensity = this.sliderValue;
      }
    }
    this.update();
    //modifier json // passer par un array au lieu du json, juste le charger au démarrage
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
