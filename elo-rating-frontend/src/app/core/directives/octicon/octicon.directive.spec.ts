import { OcticonDirective } from './octicon.directive';
import {async, ComponentFixture, TestBed} from "@angular/core/testing";
import {Component, DebugElement, ElementRef, Renderer2} from "@angular/core";
import {By} from "@angular/platform-browser";

@Component({
  selector: 'app-test-octicon-component',
  template: `
    <span appOcticon="book"></span>
    <span appOcticon="alert" color="red"></span>
  `
})
class TestOcticonComponent { }

class MockElementRef extends ElementRef {
  constructor() { super(null); }
}

describe('OcticonDirective', () => {

  let fixture: ComponentFixture<TestOcticonComponent>;
  let component: TestOcticonComponent;
  let icons: DebugElement[];

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [TestOcticonComponent, OcticonDirective],
      providers: [
        Renderer2,
        { provide: ElementRef, useClass: MockElementRef }
      ]
    });

    fixture = TestBed.createComponent(TestOcticonComponent);
    component = fixture.componentInstance;
    icons = fixture.debugElement.queryAll(By.directive(OcticonDirective));
    fixture.detectChanges();
  }));

  it('should create an instance', () => {
    expect(component).toBeTruthy();
  });

  it('should have icon with default color', () => {
    const icon = icons[0];
    expect(icon.attributes['appOcticon']).toEqual('book');
    expect(icon.attributes['color']).toBeFalsy();
  })

  it('should have icon with custom color', () => {
    const icon = icons[1];
    expect(icon.attributes['appOcticon']).toEqual('alert');
    expect(icon.attributes['color']).toEqual('red');
  })
});
