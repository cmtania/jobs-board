import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posteddate'
})
export class PostedDatePipe implements PipeTransform {

  transform(postedDate: string) : string {
    let postedDateDto = new Date(postedDate);
    var temp = Math.floor(postedDateDto.getTime());
 
    var seconds = Math.floor((Date.now() - postedDateDto.getTime()) / 1000);

    var interval = seconds / 31536000;
    if (interval > 1) {
      let y = " years ago";
      if(interval = 1 ) y = " year ago";
      return Math.floor(interval) + y;
    }

    interval = seconds / 2592000;
    if (interval > 1) {
      let m = " months ago";
      if(interval = 1 ) m = " month ago";
      return Math.floor(interval) + m;
    }

    interval = seconds / 86400;
    if (interval > 1) {
      let d = " days";
      if(interval = 1 ) d = " day ago";
      return Math.floor(interval) + d;
    }

    interval = seconds / 3600;
    if (interval > 1) {
      let h = " hours ago";
      if(interval = 1 ) h = " hour ago";
      return Math.floor(interval) + h;
    }
    
    interval = seconds / 60;
    if (interval > 1) {
      let m = " minutes ago";
      if(interval = 1 ) m = " minute ago";
      return Math.floor(interval) + m;
    }
    return Math.floor(seconds) + " seconds ago";
       
  }
}