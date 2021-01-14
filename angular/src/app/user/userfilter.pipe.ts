import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(items: any, FilterString: string, propName: any): any {
    if (!items) return [];  
        if(FilterString) {  
            return items.filter(item => item[propName].toLocaleLowerCase().indexOf(FilterString.toLocaleLowerCase()) > -1);  
        }  
        else  
        {  
            return items;  
        }
  }

}
