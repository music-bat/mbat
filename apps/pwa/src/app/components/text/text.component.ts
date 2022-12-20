import {
  Component,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  ElementRef,
  NgZone,
  Input,
  HostBinding,
  AfterContentInit,
} from '@angular/core';
import { IonText } from '@ionic/angular';
import { Color, Mode } from '@ionic/core';

@Component({
  selector: 'mbat-text',
  template: `
    <ion-text [color]="color" [mode]="mode">
      <ng-content #content></ng-content>
    </ion-text>
  `,
  styles: [``],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TextComponent extends IonText implements AfterContentInit {
  @Input() color: Color;
  @Input() mode: Mode;

  @HostBinding('style.font-size.px') fontSize = 18;
  @HostBinding('style.font-weight') fontWeight = 400;

  @HostBinding('style.margin-top')
  marginTop: string;

  @HostBinding('style.margin-bottom')
  marginBottom: string;

  @HostBinding('style.margin-left')
  marginLeft: string;

  @HostBinding('style.margin-right')
  marginRight: string;

  @Input()
  set mt(val: 's' | 'm' | 'l' | 'xl' | 'xxl' | undefined) {
    switch (val) {
      case 's':
      case 'm':
      case 'l':
      case 'xl':
      case 'xxl':
        this.marginTop = `var(--margin-${val})`;
        break;
    }
  }

  @Input()
  set mb(val: 's' | 'm' | 'l' | 'xl' | 'xxl') {
    switch (val) {
      case 's':
      case 'm':
      case 'l':
      case 'xl':
      case 'xxl':
        this.marginBottom = `var(--margin-${val})`;
        break;
    }
  }

  @Input()
  set ml(val: 's' | 'm' | 'l' | 'xl' | 'xxl') {
    switch (val) {
      case 's':
      case 'm':
      case 'l':
      case 'xl':
      case 'xxl':
        this.marginLeft = `var(--margin-${val})`;
        break;
    }
  }

  @Input()
  set mr(val: 's' | 'm' | 'l' | 'xl' | 'xxl') {
    switch (val) {
      case 's':
      case 'm':
      case 'l':
      case 'xl':
      case 'xxl':
        this.marginRight = `var(--margin-${val})`;
        break;
    }
  }

  @Input() set size(val: 's' | 'm' | 'l' | 'xl' | 'xxl') {
    switch (val) {
      case 's':
        this.fontSize = 16;
        break;
      case 'm':
        this.fontSize = 18;
        break;
      case 'l':
        this.fontSize = 24;
        break;
      case 'xl':
        this.fontSize = 32;
        break;
      case 'xxl':
        this.fontSize = 64;
        break;
      default:
        this.fontSize = 18;
        this.fontWeight = 400;
    }
  }

  @Input() set mh(val: 's' | 'm' | 'l' | 'xl' | 'xxl') {
    switch (val) {
      case 's':
      case 'm':
      case 'l':
      case 'xl':
      case 'xxl':
        this.marginLeft = `var(--margin-${val})`;
        this.marginRight = `var(--margin-${val})`;
        break;
    }
  }

  @Input() set mv(val: 's' | 'm' | 'l' | 'xl' | 'xxl') {
    switch (val) {
      case 's':
      case 'm':
      case 'l':
      case 'xl':
      case 'xxl':
        this.marginTop = `var(--margin-${val})`;
        this.marginBottom = `var(--margin-${val})`;
        break;
    }
  }

  constructor(cdr: ChangeDetectorRef, private componentRef: ElementRef, zone: NgZone) {
    super(cdr, componentRef, zone);
  }

  ionTextProps = ['color', 'mode'];

  ngAfterContentInit(): void {
    this.passPropsToIonicComponent();
  }

  passPropsToIonicComponent() {
    const [ionText] = this.componentRef.nativeElement.children;

    if (this.color) {
      ionText.color = this.color;
    }

    if (this.mode) {
      ionText.mode = this.mode;
    }
  }
}
