import { HttpClient } from "@angular/common/http";
import {
  Component,
  EventEmitter,
  HostListener,
  Input,
  OnInit,
  Output,
} from "@angular/core";
import { Feu } from "../feu";
import { MarkerService } from "../marker.service";

@Component({
  selector: "app-sliders",
  templateUrl: "./sliders.component.html",
  styleUrls: ["./sliders.component.css"],
})
export class SlidersComponent implements OnInit {
  @Input() capteursData: any;
  @Output() capteursChange: EventEmitter<any> = new EventEmitter();
  feux: Feu[];
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
      .post("http://localhost:8000/postCapteurs", body)
      .subscribe((data: Feu) => {
        const exist = this.feux.find((x) => x.id === data.id);
        if (typeof exist !== "undefined") {
          if (exist.intensity == 0) {
            this.markerService.deleteFire(data);
            const index = this.feux.indexOf(exist);
            if (index > -1) {
              this.feux.splice(index, 1);
            }
          } else {
            this.feux.find((x) => x.id === data.id).intensity = data.intensity;
            this.markerService.updateFire(data);
          }
        } else {
          const feu = new Feu();
          feu.id = data.id;
          feu.intensity = data.intensity;
          feu.positionX = data.positionX;
          feu.positionY = data.positionY;
          this.feux.push(feu);
          this.markerService.addFire(feu);
        }
      });
  }

  @HostListener("document:click", ["$event"])
  documentClick(event: MouseEvent) {
    this.idCapteur = this.markerService.idClick;
    for (const c of this.capteursData) {
      if (c.id == this.idCapteur) {
        this.sliderValue = c.intensity;
      }
    }
  }
}
