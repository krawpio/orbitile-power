import {Component, ComponentFactoryResolver, HostListener, Injector, Input, OnInit} from '@angular/core';
import {geoJSON, latLng, LatLngBounds, Map, tileLayer, tooltip} from 'leaflet';
import {PowerlineService} from '../../modules/powerline/service/powerline.service';
import {Powerline} from '../../modules/powerline/model/powerline';
import {Feature, FeatureCollection} from 'geojson';
import {AlertService} from '../../modules/alerts/service/alert.service';
import {Alert} from '../../modules/alerts/model/alert';
import {MapPopupComponent} from './map-popup/map-popup.component';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent implements OnInit {

  private singleLineOptions = {
    style: {
      color: 'orange',
      weight: 2,
      opacity: 1
    }
  };

  private bufferOptions = {
    style: {
      color: 'yellow',
      weight: 1,
      opacity: 0.3
    }
  };

  private map: Map;

  options = {
    zoom: 10,
    center: latLng(52.72462, 19.3434905),
    layers: [tileLayer(
      'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}', {
        attribution: '',
        maxZoom: 20,
        id: 'mapbox/streets-v11',
        accessToken: 'pk.eyJ1Ijoia3Jhd3BpbyIsImEiOiJjazBxNzBmanowNTJnM29wZzN2ODg0c3J4In0.1UMIl5BqxAYxY1WNCmIwsQ'
      })]
  };

  leafletLayers;
  leafletFitBounds: LatLngBounds;
  private line: Powerline;
  private markedAlerts: Alert[];

  @Input('powerline')
  set powerline(powerline: Powerline) {
    if (powerline.id != null) {
      this.line = powerline;
      this.initPowerlineLayers(powerline.id, true);
    }
  }

  @Input('alerts')
  set alerts(alerts: Alert[]) {
    this.markedAlerts = alerts;
    this.initAlertLayers(alerts);
  }

  @Input() noAdditionalAlerts: boolean;

  constructor(
    private powerlineService: PowerlineService,
    private alertService: AlertService,
    private resolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  ngOnInit(): void {
    this.leafletLayers = [];
    if (this.noAdditionalAlerts === undefined) {
      this.noAdditionalAlerts = false;
    }
  }


  @HostListener('window:click', ['$event']) onMouseClick($event) {
    if ($event.path.filter(this.pathElementIsMapToggle).length > 0) {
      setTimeout(() => this.resize(), 500);
    }
  }

  onMapReady(map: Map) {
    this.map = map;
    setTimeout(() => this.map.invalidateSize(), 1);
  }

  resize() {
    this.map.invalidateSize({animate: true});
    if (this.leafletFitBounds) {
      this.map.fitBounds(this.leafletFitBounds);
    }
  }

  private initAlertLayers(alerts: Alert[]) {
    this.leafletLayers = [];
    if (alerts.length > 0) {
      const ids = Array.from(new Set(alerts.map(alert => alert.powerLineId)));
      ids.forEach(id => {
        this.initPowerlineLayers(id, false);
      });
    } else if (this.line !== undefined) {
      this.initPowerlineLayers(this.line.id, true);
    }
  }

  private initPowerlineLayers(powerLineId: number, fitBounds: boolean) {
    this.leafletLayers = [];
    // powerlines
    this.powerlineService.getPowerLineShape(powerLineId)
      .subscribe(powelinefc => {
        this.pushLayer(powelinefc, this.singleLineOptions, fitBounds);
        // buffers
        this.powerlineService.getPowerLineBuffer(powerLineId)
          .subscribe(bufferfc => {
            this.pushLayer(bufferfc, this.bufferOptions);
            // alerts
            if (!this.noAdditionalAlerts) {
              this.alertService.getAlertsForPowerlineShape(powerLineId)
                .subscribe(fc => {
                  this.pushLayer(fc, this.alertOptions(false));
                  this.pushMarkedAlertLayer();
                });
            } else {
              this.pushMarkedAlertLayer();
            }
          });
      });
  }

  private pushMarkedAlertLayer() {
    if (this.markedAlerts && this.markedAlerts.length > 0) {
      const alertIds = this.markedAlerts.map(a => a.id);
      this.alertService.getAlertsShapes(alertIds).subscribe(
        marked => this.pushLayer(marked, this.alertOptions(true), true));
    }
  }


  private pushLayer(featureCollection: FeatureCollection, options, fitBounds?: boolean) {
    const layer = geoJSON(featureCollection, options);
    this.leafletLayers.push(layer);
    if (fitBounds) {
      this.leafletFitBounds = layer.getBounds();
    }
  }

  private pathElementIsMapToggle(path) {
    return path.className !== undefined && path.className.indexOf('map-toggle') !== -1;
  }

  private alertStyle(feature, marked: boolean) {
    const w = marked ? 3 : 1;
    if (feature.properties.status === 'INACTIVE') {
      return {
        color: 'grey',
        weight: w,
        opacity: 0.7,
        className: 'alert'
      };
    } else {
      return {
        color: '#e31a1c',
        weight: w,
        opacity: 0.7,
        className: 'alert'
      };
    }
  }

  private alertOptions(marked: boolean) {
    return {
      onEachFeature: (feature, l) => {
        l.bindTooltip(this.contentFromFeature(feature));
      },
      style: (feature) => this.alertStyle(feature, marked)
    };
  }

  private contentFromFeature(feature: Feature) {
    const factory = this.resolver.resolveComponentFactory(MapPopupComponent);
    const component = factory.create(this.injector);
    component.instance.feature = feature;
    component.changeDetectorRef.detectChanges();
    const popupContent = component.location.nativeElement;
    return tooltip().setContent(popupContent);
  }

}
