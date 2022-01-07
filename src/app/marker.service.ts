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
  circleList = [];
  idClick = 1;
  map;

  constructor(private http: HttpClient, private popupService: PopUpService) {}

  static scaledRadius(val: number, maxVal: number): number {
    return 1000 * (val / maxVal) + 75;
  }

  makeCircleMarkers(map: L.map, data): void {
    this.map = map;
    for (const c of data) {
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
      this.circleList[c.id] = circle;
    }
  }

  updateCircleMarkers(map: L.map, data) {
    var i: number;
    for (i = 1; i <= 60; i++) {
      console.log(this.circleList[i].myCustomID);
      if (this.circleList[i].myCustomID == data.id) {
        map.removeLayer(this.circleList[i]);
      }
    }
    const lon = data.coordinates[0];
    const lat = data.coordinates[1];
    const circle = L.circle([lat, lon], {
      radius: MarkerService.scaledRadius(data.intensity, 9),
    });
    circle.bindPopup(this.popupService.makeCapteurPopup(data));
    circle.myCustomID = data.id;
    circle.addTo(map);
    circle.on('click', (e) => {
      this.idClick = e.target.myCustomID;
    });
    this.circleList[data.id] = circle;
  }
}
