import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FeatureCollection} from 'geojson';
import {saveAs} from 'file-saver';
import {map} from "rxjs/operators";
import {DeserializeArray, JsonArray} from "cerializr";
import {Alert} from "../model/alert";
import {MessageService} from "../../../core/messages/message.service";

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {
  }

  getAlertsShapes(ids: number[]): Observable<FeatureCollection> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('ids', JSON.stringify(ids));
    return this.http.get<FeatureCollection>('/alert/shapes', { params : httpParams });
  }

  getAlertsForPowerlineShape(id: number): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>(`/alert/shapeByPowerLine/${id}`);
  }

  getAlertsForOrder(idOrder: number): Observable<Alert[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('idorder', idOrder.toString());
    return this.http.get('/alert/search', {params: httpParams}).pipe(
      map((res: JsonArray) => DeserializeArray(res, Alert))
    );
  }

  getAlertsForPowerLine(code: string): Observable<Alert[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('code', code);
    return this.http.get('/alert/search', {params: httpParams}).pipe(
      map((res: JsonArray) => DeserializeArray(res, Alert))
    );
  }

  export(ids: number[]) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('ids', JSON.stringify(ids));
    return this.http.get('/alert/export', {params : httpParams, responseType: 'blob' })
      .subscribe(res => {
        saveAs(res, 'alarmy.xlsx');
        this.messageService.sendInfo(`Alarmy (${ids.length}) zostały wyeksporowane`);
      });
  }
}
