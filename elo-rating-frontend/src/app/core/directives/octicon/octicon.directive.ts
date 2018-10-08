import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import * as octicons from 'octicons';

@Directive({
  selector: '[appOcticon]'
})
export class OcticonDirective implements OnInit {

  @Input() appOcticon: string;
  @Input() color: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    const el: HTMLElement = this.elementRef.nativeElement;
    el.innerHTML = octicons[this.appOcticon].toSVG();
    const icon: Node = el.firstChild;

    if (this.color) {
      this.renderer.setStyle(icon, 'color', this.color)
    }
  }
}
