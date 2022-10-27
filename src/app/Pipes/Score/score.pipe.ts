import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'score'
})
export class ScorePipe implements PipeTransform {

  transform(value: number, ...args: unknown[]): unknown {
    var returnString:string = "";

    if(value==1){
      returnString=value.toString()+" punto";
    }else{
      returnString=value.toString()+" puntos";
    }

    return returnString;
  }
}