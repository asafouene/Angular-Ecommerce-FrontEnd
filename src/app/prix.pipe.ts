import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'prix'
})
export class PrixPipe implements PipeTransform {

  transform(value: number): string {  
   let a=value.toString()
   let first,middle,last
     
     if(a.indexOf('.')==-1){
        first=a.substring(0,a.length-3)
        last="000"
        middle=a.substring(first.length,a.length)
     }
     else{
       first=a.substring(0,a.indexOf('.')-3)
       last=a.substring(a.indexOf('.')+1,a.length)
      if(last.length==2)last=last+"0"
      else if(last.length==1)last=last+"00"
      else last=last
         middle=a.substring(first.length,a.indexOf('.'))
     }



     return first+" "+middle+","+last+" TND"
   

   }
}


