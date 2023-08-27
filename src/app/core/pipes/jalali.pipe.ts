import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'jalali',
})
export class JalaliPipe implements PipeTransform {
  transform(value: string | undefined, format = 'YYYY-MM-DD'): any {
    const formatOptions: Intl.DateTimeFormatOptions = {
      year: undefined,
      month: undefined,
      day: undefined,
      hour: undefined,
      minute: undefined,
      second: undefined,
      timeZone: 'Asia/Tehran',
      dateStyle: undefined,
    };

    if (!value || !value?.length) return '';

    if (format === 'full') {
      console.log(value);
      return new Intl.DateTimeFormat('fa-IR', { dateStyle: 'full' })
        .format(new Date(value.includes('Z') ? value : value + 'Z'))
        .split(' ')
        .reverse()
        .join(' ');
    }

    const t = /(\[[^[]*\])|(\\)?(Mo|MM?M?M?|Do|DDDo|DD?D?D?|YYYY|YY|HH?|mm?|SS?S?|.)/g;

    const matches = format.match(t);

    if (matches)
      for (let index = 0; index < matches.length; index++) {
        switch (matches[index]) {
          case 'YYYY':
            formatOptions.year = 'numeric';
            break;
          case 'YY':
            formatOptions.year = '2-digit';
            break;
          case 'MM':
            formatOptions.month = '2-digit';
            break;
          case 'MMM':
            formatOptions.month = 'short';
            break;
          case 'MMMM':
            formatOptions.month = 'long';
            break;
          case 'DD':
            formatOptions.day = '2-digit';
            break;
          case 'DDD':
            formatOptions.weekday = 'short';
            break;
          case 'DDDD':
            formatOptions.weekday = 'long';
            break;
          case 'HH':
            formatOptions.hour = 'numeric';
            break;
          case 'mm':
            formatOptions.minute = 'numeric';
            break;
          case 'SS':
            formatOptions.second = 'numeric';
            break;
          default:
            break;
        }
      }

    // handle iran time zone on item date ---------------
    const myDate = new Date(value);

    const iranOffset = 420;
    const iranTime = new Date(myDate.getTime() + myDate.getTimezoneOffset() * 60 * 1000 + iranOffset * 60 * 1000);

    value = iranTime.toISOString();
    // ---------------------

    if (typeof value === 'string') {
      return new Intl.DateTimeFormat('fa-IR', formatOptions).format(new Date(value));
    }

    return new Intl.DateTimeFormat('fa-IR').format(value);
  }

  toInteger(value: any): number {
    return parseInt(`${value}`, 10);
  }

  isNumber(value: any): value is number {
    return !isNaN(this.toInteger(value));
  }

  parse(value: string, seperator: string): any | null {
    if (value != null) {
      const dateParts = value.trim().split(seperator);
      if (dateParts.length === 1 && this.isNumber(dateParts[0])) {
        return { year: +dateParts[0], month: <any>null, day: <any>null };
      } else if (dateParts.length === 2 && this.isNumber(dateParts[0]) && this.isNumber(dateParts[1])) {
        return { year: this.toInteger(dateParts[0]), month: this.toInteger(dateParts[1]), day: <any>null };
      } else if (
        dateParts.length === 3 &&
        this.isNumber(dateParts[0]) &&
        this.isNumber(dateParts[1]) &&
        this.isNumber(dateParts[2])
      ) {
        return {
          year: this.toInteger(dateParts[0]),
          month: this.toInteger(dateParts[1]),
          day: this.toInteger(dateParts[2]),
        };
      }
    }
    return null;
  }
}
