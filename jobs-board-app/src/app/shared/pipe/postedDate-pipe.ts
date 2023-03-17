import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'posteddate'
})
export class PostedDatePipe implements PipeTransform {

  transform(postedDate: string) : string {
    const postedDateDto = new Date(postedDate);
    const seconds = Math.floor((Date.now() - postedDateDto.getTime()) / 1000);

    let interval = seconds / 31536000;
    if (interval > 1) {
      let y = " years ago";
      if(interval = 1 ) y = " year ago";
      return Math.floor(interval).toString().concat(y);
    }

    interval = seconds / 2592000;
    if (interval > 1) {
      let m = " months ago";
      if(interval = 1 ) m = " month ago";
      return Math.floor(interval).toString().concat(m);
    }

    interval = seconds / 86400;
    if (interval > 1) {
      let d = " days";
      if(interval = 1 ) d = " day ago";
      return Math.floor(interval).toString().concat(d);
    }

    interval = seconds / 3600;
    if (interval > 1) {
      let h = " hours ago";
      if(interval = 1 ) h = " hour ago";
      return Math.floor(interval).toString().concat(h);
    }
    
    interval = seconds / 60;
    if (interval > 1) {
      let m = " minutes ago";
      if(interval = 1 ) m = " minute ago";
      return Math.floor(interval).toString().concat(m);
    }
    return Math.floor(seconds).toString().concat(" seconds ago");
  }
}