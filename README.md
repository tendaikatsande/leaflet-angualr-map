# LeafletMap

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 10.0.0.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).


## Leaflet js config
npm i leaflet
npm i @types/leaflet -D
<!-- npm install --save leaflet-search -->
npm install --save leaflet-geosearch
npm install --save leaflet-routing-machine

npm install https://github.com/maximeh/leaflet.bouncemarker

## add this to below the body of the index.html
<link
  rel="stylesheet"
  href="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.css"
/>

<!-- Make sure you put this AFtER leaflet.js, when using with leaflet -->
<script src="https://unpkg.com/leaflet-geosearch@3.0.0/dist/geosearch.umd.js"></script>

## add this to the component of your choice
<div id="map"></div>

@import "~leaflet/dist/leaflet.css";


import { from } from 'rxjs';
import * as L from 'leaflet'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {


  map: L.Map

  constructor() { }

  ngOnInit() {
    this.map = L.map('map', {
      center: [25.3791924, 55.4765436],
      zoom: 15,
      renderer: L.canvas()
    })

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map)


    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
}
# leaflet-angualr-map
