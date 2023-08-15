import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'seachfilter'
})
export class SeachfilterPipe implements PipeTransform {

  transform(value : any[], filterString: string, brandname:string): any[] {
    const result:any =[];
    if(!value  || filterString === '' || brandname === '')
    {
      console.warn(value);
      return value;
    }
    else{value.forEach((a:any)=>{
      if(a[brandname])
      {
        console.warn(a,2);
        result.push(a);
      }
    });
    return result;
  }
  }

}
