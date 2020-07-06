import {Alert} from '../model/alert';

export class MarkAlertsData {
  alerts: Alert[];
  action: () => void;

  constructor(options: Partial<MarkAlertsData> = {}) {
    this.alerts = options.alerts;
    this.action = options.action;
  }
}
