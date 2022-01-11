import { HttpClient } from '@angular/common/http';
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { Feu } from '../feu';
import { MarkerService } from '../marker.service';

@Component({
  selector: 'app-sliders',
  templateUrl: './sliders.component.html',
  styleUrls: ['./sliders.component.css'],
})
export class SlidersComponent implements OnInit {
  @Input() capteursData: any;
  @Input() feux: Feu[];
  @Output() capteursChange: EventEmitter<any> = new EventEmitter();
  idCapteur: number;
  sliderValue;
  postId: number;
  postCapteur = {
    capteurs: [
      {
        id: 42,
        intensity: 8,
      },
    ],
  };

  constructor(
    private markerService: MarkerService,
    private httpClient: HttpClient
  ) {}

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
    this.markerService.updateCircleMarkers(
      this.markerService.map,
      this.idCapteur,
      this.sliderValue
    );
    this.postCapteurs();
  }

  postCapteurs() {
    this.postCapteur.capteurs[0].id = this.idCapteur;
    this.postCapteur.capteurs[0].intensity = Number(
      this.capteursData[this.idCapteur - 1].intensity
    );
    const body = JSON.stringify(this.postCapteur);
    this.httpClient
      .post('http://localhost:8000/postCapteurs', body)
      .subscribe((data: any) => {
        this.markerService.updateFeu(this.feux, data.feux[0]);
      });
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
