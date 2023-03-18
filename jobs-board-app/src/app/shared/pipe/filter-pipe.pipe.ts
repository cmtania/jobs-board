import { Pipe, PipeTransform } from '@angular/core';
import * as _ from 'lodash';

@Pipe({
  name: 'filterText',
})
export class FilterTextPipe implements PipeTransform {
  transform(value: any[], text: any, type?: any): any {
    if (!value) return [];
    if (!text || text.length < 3) return value;

    return _.filter(value, (item: any) => {
      if (!type) {
        return (
          JSON.stringify(item).toLowerCase().includes(text.toLowerCase())
        );
      } else {
        return item[type].toLowerCase().includes(text.toLowerCase());
      }
    });
  }
}
