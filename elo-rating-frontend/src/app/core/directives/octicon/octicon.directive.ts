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
    const icon: Node = el.firstChild;

    const computedColor = getComputedStyle(el).color;
    this.renderer.setStyle(icon, 'color', this.rgb2hex(computedColor).toString());

    if (this.size == 'lg') {
      this.renderer.setStyle(icon, 'width', '18');
      this.renderer.setStyle(icon, 'height', '100%');
    }
  }

  private rgb2hex(rgb): string {
    rgb = rgb.match(/^rgb\((\d+),\s*(\d+),\s*(\d+)\)$/);
    function hex(x) {
      return ("0" + parseInt(x).toString(16)).slice(-2);
    }
    return "#" + hex(rgb[1]) + hex(rgb[2]) + hex(rgb[3]);
  }
}
