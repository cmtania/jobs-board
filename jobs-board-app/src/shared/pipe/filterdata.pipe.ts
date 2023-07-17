import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterdata'
})
export class FilterDataPipe implements PipeTransform {

  transform(items:any[], value:string, column:any[]) :any {
    let filterkeys = Object.keys(column).map(function(key: any) {
      return column[key];
    });
    
    if (!items) return [];
    if (!value) return items;

   
    for (const val of filterkeys) {
       //debugger;
      value = String(value).toLocaleLowerCase();
      let result = items.filter(e => String(e[val]).toLocaleLowerCase().indexOf(value) > -1 );
      if(result.length >= 1){
        return result;
       }
    }
  }
}


