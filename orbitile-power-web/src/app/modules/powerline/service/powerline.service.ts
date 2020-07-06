import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';
import {FeatureCollection} from 'geojson';
import {Powerline} from '../model/powerline';
import {map} from 'rxjs/operators';
import {Deserialize, JsonObject} from 'cerializr';
import {saveAs} from 'file-saver';
import {MessageService} from '../../../core/messages/message.service';



@Injectable({
  providedIn: 'root'
})
export class PowerlineService {

  constructor(
    private http: HttpClient,
    private messageService: MessageService) {}

  getPowerLine(id: number): Observable<Powerline> {
    return this.http.get(`/powerline/${id}`).pipe(
      map((res: JsonObject) => Deserialize(res, Powerline))
    );
  }

  getPowerLineShape(id: number): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>(`/powerline/shape/${id}`);
  }

  getPowerLineBuffer(id: number): Observable<FeatureCollection> {
    return this.http.get<FeatureCollection>(`/powerline/buffer/${id}`);
  }

  export(ids: number[]) {
    let httpParams = new HttpParams();
    httpParams = httpParams.append('ids', JSON.stringify(ids));
    return this.http.get('/powerline/export', {params : httpParams, responseType: 'blob' })
      .subscribe(res => {
        saveAs(res, 'linie.xlsx');
        this.messageService.sendInfo(`Linie (${ids.length}) zostały wyeksportowane`);
      });
  }
}
