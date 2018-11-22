import {Directive, ElementRef, Input, OnInit, Renderer2} from '@angular/core';
import * as octicons from 'octicons';

@Directive({
  selector: '[appOcticon]'
})
export class OcticonDirective implements OnInit {

  @Input() appOcticon: string;
  @Input() size: string;

  constructor(private elementRef: ElementRef, private renderer: Renderer2) { }

  ngOnInit(): void {
    if (this.iconExists()) {
      this.renderIcon();
    }
  }

  private iconExists(): boolean {
    return octicons[this.appOcticon] != undefined;
  }

  private renderIcon() {
    const el: HTMLElement = this.elementRef.nativeElement;
    el.innerHTML = octicons[this.appOcticon].toSVG();
    this.setSize(el);
  }

  private setSize(element: HTMLElement): void {
    if (this.size == 'md') {
      this.renderer.setStyle(element.firstChild, 'width', '18');
      this.renderer.setStyle(element.firstChild, 'height', '100%');
    } else if (this.size == 'lg') {
      this.renderer.setStyle(element.firstChild, 'width', '24');
      this.renderer.setStyle(element.firstChild, 'height', '100%');
    }
  }
}
