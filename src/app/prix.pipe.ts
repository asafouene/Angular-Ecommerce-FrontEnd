import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prix'
})
export class PrixPipe implements PipeTransform {

  transform(value: number): string {
      let result = '';
      if (value !== null && value !== undefined && !isNaN(value)) {
         if (typeof(value) === 'string') {
            value = parseFloat(value);
         }
         const parts = value.toString().split(',');
         parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
         if(value.toString().indexOf(',')===-1){
          result=parts.join(',') + ',000 TND';
         }
         else{
          result=parts.join(',') + ' TND';
         }
         
      } else {
         result='0,000 TND';
      }
      return result;
   }

}
