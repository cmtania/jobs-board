import { Directive, ElementRef, HostListener } from '@angular/core';

@Directive({
  selector: '[appNumberFormat]'
})
export class NumberFormatDirective {

  constructor(private el: ElementRef) { }

  @HostListener('input', ['$event.target.value'])
  onInput(value: string) {
    // Remove all commas from the current value
    const parsedValue = value.replace(/,/g, '');

    // Format the value with commas
    const formattedValue = this.formatNumberWithCommas(parsedValue);

    // Update the input value with the formatted value
    this.el.nativeElement.value = formattedValue;
  }

  // Helper function to format number with commas
  private formatNumberWithCommas(value: string): string {
    return Number(value).toLocaleString();
  }
}
