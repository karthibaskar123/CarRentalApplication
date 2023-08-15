import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'offer'
})
export class OfferPipe implements PipeTransform {

  transform(value: any): any {
    const offervalue= value - 1000;
    return offervalue;
  }

}
