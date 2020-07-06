export class ControlBase<T> {
  value: T;
  toValue: T;
  key: string;
  label: string;
  placeholder: string;
  required: boolean;
  order: number;
  controlType: string;
  type: string;
  width: number;
  options: {key: string, value: string}[];
  fromRange: number;
  toRange: number;

  constructor(options: Partial<ControlBase<T>> = {}) {
    this.value = options.value;
    this.toValue = options.toValue;
    this.key = options.key || '';
    this.label = options.label || '';
    this.placeholder = options.placeholder || '';
    this.required = !!options.required;
    this.order = options.order === undefined ? 1 : options.order;
    this.controlType = options.controlType || '';
    this.type = options.type || '';
    this.width = options.width;
  }


  clearValue() {
    this.value = null;
    this.toValue = null;
  }

  getChipValue(): string {
    return this.value.toString();
  }

  isChipAvailable() {
    return true;
  }
}



