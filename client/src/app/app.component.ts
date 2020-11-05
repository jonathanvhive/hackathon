import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import * as Cesium from 'cesium';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{

  private readonly API_URL_PREFIX = 'https://z2d4rfsj51.execute-api.us-east-1.amazonaws.com/dev/api';

  title = 'client';

  @ViewChild('cesiumEl', {static: true}) cesiumEl: ElementRef;

  cesiumViewer: Cesium.Viewer;

  ngOnInit() {
    this.cesiumViewer = new Cesium.Viewer(this.cesiumEl.nativeElement, {
      imageryProvider: new Cesium.ArcGisMapServerImageryProvider({
        url:
          "https://services.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer",
      }),
      baseLayerPicker: false,
      infoBox: false,
    });

    fetch(`${this.API_URL_PREFIX}/user`, {
      method: 'get'
    }).then(r => r.json()).then(r => {
      // debugger;
    });
  }
}
