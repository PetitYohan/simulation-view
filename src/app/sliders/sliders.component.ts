import { HttpClient } from '@angular/common/http';
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
  @Input() capteursData: any;
  @Output() capteursChange: EventEmitter<any> = new EventEmitter();
  idCapteur: number;
  sliderValue;
  postId: number;
  test: Capteur = {
    id: 42,
    intensity: 8
  }

  constructor(private markerService: MarkerService, private httpClient: HttpClient) {}

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

  postCapteurs(){
    const headers = { 'content-type': 'application/json'}  
    const body=JSON.stringify(this.test);
    console.log(body)
    this.httpClient.post('http://localhost:8000/postCapteurs', body,{'headers':headers}).subscribe(data => {
      console.log(data);
    });
    console.log(this.httpClient.post('http://localhost:8000/postCapteurs', body,{'headers':headers}));
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
