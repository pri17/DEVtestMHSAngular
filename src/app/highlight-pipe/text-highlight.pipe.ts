import { Pipe, PipeTransform } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Pipe({
  name: 'textHighlight'
})
export class TextHighlightPipe implements PipeTransform {

  constructor(private sanitizer: DomSanitizer){}

  transform(value: any, args: any): any {
    // Match in a case insensitive maneer
    const rule = new RegExp(args, 'gi');
    const match = value.match(rule);

    // If there's no args or match, just return the original value.
    if (!args || !match) {
      return value;
    }

    const replacedValue = value.replace(rule, "<sapn class ='redss'>" + match[0] + "</span>")
    return this.sanitizer.bypassSecurityTrustHtml(replacedValue)
  }

}
