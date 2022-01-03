import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { PopUpService } from './popup.service';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MarkerService {
  capteurs: string = '/assets/data/capteurs.geojson';

  constructor(private http: HttpClient, private popupService: PopUpService) {}

  static scaledRadius(val: number, maxVal: number): number {
    return 20 * (val / maxVal);
  }

  makeCircleMarkers(map: L.map): void {
    this.http.get(this.capteurs).subscribe((res: any) => {
      const maxPop = Math.max(
        ...res.features.map((x) => x.properties.population),
        0
      );

      for (const c of res.features) {
        const lon = c.geometry.coordinates[0];
        const lat = c.geometry.coordinates[1];
        const circle = L.circleMarker([lat, lon], {
          radius: MarkerService.scaledRadius(c.properties.intensity, 9),
        });
        circle.bindPopup(this.popupService.makeCapteurPopup(c.properties));

        circle.addTo(map);
      }
    });
  }
}
