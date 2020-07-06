export class ActionButton<T> {
  label: string;
  icon: string;
  buttonType: string;
  visible: boolean;
  action: (params: T[]) => void;

  constructor(options: Partial<ActionButton<T>> = {}) {
    this.label = options.label;
    this.icon = options.icon;
    this.buttonType = options.buttonType || 'default';
    this.action = options.action;
    if (options.visible !== undefined) {
      this.visible = options.visible;
    } else{
      this.visible = true;
    }
  }
}
