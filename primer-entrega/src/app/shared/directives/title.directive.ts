import {Directive, ElementRef} from '@angular/core';

@Directive({
  selector: '[appTitle]',
  standalone: true
})
export class TitleDirective {

  size: number = 20;

  constructor(private el: ElementRef<HTMLElement>) {
    this.changeFontSize(this.size);
    }

  changeFontSize(size: number) {
    this.el.nativeElement.style.fontSize = size + 'px';
  }

}
