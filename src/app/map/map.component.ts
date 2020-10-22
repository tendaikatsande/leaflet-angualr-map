import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import * as L from 'leaflet'
import 'leaflet.BounceMarker'

import "leaflet/dist/images/marker-shadow.png";
import "leaflet/dist/images/marker-icon.png";
import "leaflet/dist/images/marker-icon-2x.png";
import 'node_modules/leaflet-geosearch/dist/geosearch.css';
import * as GeoSearch from 'leaflet-geosearch';
import 'leaflet-routing-machine'

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {


  map: L.Map
  center: any[]
  location = { lat: 0, lng: 0 }
  location_data;

  constructor() { }

  ngOnInit() {
    this.getLocation()

  }

  /**
   * 
   */
  async getLocation() {
    if (navigator.geolocation) {
      await navigator.geolocation.getCurrentPosition(x => {
        console.log(x.coords)
        this.location.lat = Number(x.coords.latitude)
        this.location.lng = Number(x.coords.longitude)
        this.loadMap([Number(x.coords.latitude), Number(x.coords.longitude)])

      });

    }
    else {
      this.loadMap([25.3791924, 55.4765436])

    }


  }

  /**
   * 
   * @param center 
   */
  loadMap(center) {
    this.map = L.map('map', {
      center: center,
      zoom: 15,
      renderer: L.canvas()
    })


    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '© OpenStreetMap',
    }).addTo(this.map)

    // Control 3: This add a Search bar
    const search = new GeoSearch.GeoSearchControl({
      provider: new GeoSearch.OpenStreetMapProvider(),
      style: 'bar', // optional: bar|button  - default button,
      autoComplete: true, // optional: true|false  - default true
      autoCompleteDelay: 250, // optional: number      - default 250,
      showMarker: true, // optional: true|false  - default true
      showPopup: true, // optional: true|false  - default false
      marker: {
        // optional: L.Marker    - default L.Icon.Default
        icon: new L.Icon.Default(),
        draggable: true,
      },
      popupFormat: ({ query, result }) => result.label, // optional: function    - default returns result label
      maxMarkers: 1, // optional: number      - default 1
      retainZoomLevel: false, // optional: true|false  - default false
      animateZoom: true, // optional: true|false  - default true
      autoClose: false, // optional: true|false  - default false
      searchLabel: 'Enter address (Isai Kero)', // optional: string      - default 'Enter address'
      keepResult: false, // optional: true|false  - default false
    });


    this.map.addControl(search);


    this.map.on('geosearch/showlocation', (x: any) => { console.log(x); this.location = x.location });
    this.map.on('geosearch/marker/dragend', (x: any) => { console.log(x); this.location = x.location });
    this.map.on('dragend', (x: any) => { console.log(x); this.location = x.location })
    this.map.on('load', (x: any) => { console.log("loading"); })

    this.addHomeMarker()
    this.addMarker()
    this.onMapReady()

    setTimeout(() => {
      this.map.invalidateSize();
    }, 0);
  }
  /**
   * 
   */
  addHomeMarker() {
    //...

    L.circle(this.location, {
      color: 'steelblue',
      radius: 500,
      fillColor: 'steelblue',
      opacity: 0.5
    }).addTo(this.map)

  }
  /**
   * 
   */
  addMarker() {
    L.marker(this.location, {
      draggable: true,
      // bounceOnAdd: true
    }).addTo(this.map)

  }

  calculateDistance() {
    // let routes = L.

  }

  onMapReady() {
    console.log("ggggggg")
    L.Routing.control({
      waypoints: [L.latLng(-17.7831936, 31.011635199999997), L.latLng(-17.867416604114297, 31.007847469300035)],
      routeWhileDragging: true
    }).on('routesfound', function (e) {
      var routes = e.routes;
      console.log("routes found", routes)
      // alert('Found ' + routes.length + ' route(s).');
    }).addTo(this.map)
  }


}
