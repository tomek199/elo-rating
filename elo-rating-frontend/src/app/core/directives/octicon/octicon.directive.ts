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
    this.setColor(el);
    this.setSize(el);
  }

  private setColor(element: HTMLElement): void {
    let computedColor = getComputedStyle(element).color;
    let rgb = computedColor.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    if (rgb) {
      let color = "#" + this.hex(rgb[1]) + this.hex(rgb[2]) + this.hex(rgb[3]);
      this.renderer.setStyle(element.firstChild, 'color', color);
    }
  }

  private hex(x): string {
    return ("0" + parseInt(x).toString(16)).slice(-2);
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
