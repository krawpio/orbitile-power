import { ControlBase } from '../control-base';

export class SliderControl extends ControlBase<number> {
  controlType = 'slider';
  options: {key: string, value: string}[] = [];

  constructor(options: Partial<SliderControl> = {}) {
    super(options);
    this.fromRange = options.fromRange || 0;
    this.toRange = options.toRange;
    this.value = this.fromRange;
    this.toValue = this.toRange;
  }

  isChipAvailable(): boolean {
    return (this.value !== this.fromRange) || (this.toValue !== this.toRange);
  }

  getChipValue(): string {
    const vals = [];
    if ((this.value != null) && (this.value !== this.fromRange)) {
      vals.push(`Od: ${this.value}`);
    }
    if ((this.toValue != null) && (this.toValue !== this.toRange)) {
      vals.push(`Do: ${this.toValue}`);
    }
    return vals.join(' ');
  }

  clearValue() {
    this.value = this.fromRange;
    this.toValue = this.toRange;
  }

}
