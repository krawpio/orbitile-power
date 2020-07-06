import {Injectable} from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Alert} from '../../alerts/model/alert';
import {Order} from '../model/order';
import {Observable} from 'rxjs';
import {saveAs} from 'file-saver';
import {map, tap} from 'rxjs/operators';
import {Deserialize, DeserializeArray, JsonArray, JsonObject} from 'cerializr';
import {MessageService} from '../../../core/messages/message.service';


@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(private http: HttpClient,
              private messageService: MessageService) { }

  private static idsParams(ids: number[]): HttpParams {
    const httpParams = new HttpParams();
    return httpParams.append('ids', JSON.stringify(ids));
  }

  getOrder(id: number): Observable<Order> {
    return this.http.get(`/order/${id}`).pipe(
      map((res: JsonObject) => Deserialize(res, Order))
    );
  }

  getOrdersForPowerLine(id: number): Observable<Order[]> {
    return this.http.get(`/order/search/powerline/${id}`).pipe(
      map((res: JsonArray) => DeserializeArray(res, Order))
    );
  }

  createOrder(alerts: Alert[]): Observable<Order> {
    return this.http.post<Order>('/order', alerts.map(alert => alert.id))
      .pipe(
        tap(order => this.messageService.sendInfo(`Zlecenia nr ${order.nr} zostało utworzone`)));
  }

  export(ids: number[]) {
    return this.http.get(
      '/order/export',
      {params: OrderService.idsParams(ids), responseType: 'blob' })
      .subscribe(res => {
        saveAs(res, 'zlecenia.xlsx');
        this.messageService.sendInfo(`Zlecenia (${ids.length}) zostały wyeksportowane`);
      });
  }

  delete(ids: number[]) {
    return this.http.get('/order/delete', {params : OrderService.idsParams(ids)})
      .pipe(tap(() => this.messageService.sendInfo(`Zlecenia (${ids.length}) zostały usunięte`)));
  }

  close(ids: number[]) {
    return this.http.get('/order/close', {params : OrderService.idsParams(ids)})
      .pipe(tap(() => this.messageService.sendInfo(`Zlecenia (${ids.length}) zostały zamknięte`)));
  }
}
