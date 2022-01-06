import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from './popup.service';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  capteursData: any;
  circleMarker: any;
  idClick = 1;

  constructor(private http: HttpClient, private popupService: PopUpService) {}

  static scaledRadius(val: number, maxVal: number): number {
    return 1000 * (val / maxVal) + 50;
  }

  makeCircleMarkers(map: L.map): void {
    this.http.get<any>('assets/data/capteurs.json').subscribe((data) => {
      for (const c of data.capteurs) {
        const lon = c.coordinates[0];
        const lat = c.coordinates[1];
        const circle = L.circle([lat, lon], {
          radius: MarkerService.scaledRadius(c.intensity, 9),
        });
        circle.bindPopup(this.popupService.makeCapteurPopup(c));
        circle.myCustomID = c.id;
        circle.addTo(map);
        circle.on('click', (e) => {
          this.idClick = e.target.myCustomID;
        });
      }
    });
  }
}
