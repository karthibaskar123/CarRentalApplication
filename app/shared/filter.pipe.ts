import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {

  transform(value: any[],filterstring :string,propName:string): any[] {
    const result:any = [];
    if(!value  || filterstring === '' || propName  ==='')
    {
      return value;
    }
    value.forEach((value:any)=>{
      if(value[propName].trim().toLowerCase().includes(filterstring.toLowerCase()))
      {
        result.push(value);
      }
    });
    return result;
  }

}
