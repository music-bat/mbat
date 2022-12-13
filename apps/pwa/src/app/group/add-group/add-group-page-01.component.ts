import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  ViewEncapsulation
} from "@angular/core";

@Component({
  selector: 'mbat-add-group-page-01',
  template: `
    <div class="content-head">
      <img src="assets/img/add-group.svg" />
      <mbat-text size="l">Deine erste Gruppe</mbat-text>
    </div>

    <div class="content-body">
      <ion-col class="text">
        <mbat-text size="m" mv="s">
          Du benötigst eine Gruppe, um die App nutzen zu können. Bitte erstelle
          eine Gruppe, oder trete einer Gruppe bei.
        </mbat-text>
      </ion-col>
    </div>

    <div class="content-footer buttons flexbox ion-justify-content-center">
      <ion-row>
        <ion-col>
          <ion-button (click)="next('create')">Gruppe Erstellen</ion-button>
        </ion-col>
        <ion-col>
          <ion-button (click)="next('join')">Gruppe Beitreten</ion-button>
        </ion-col>
      </ion-row>
    </div>
  `,
  styleUrls: ['add-group.page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupPage01Component {
  @Output() slideNext = new EventEmitter<'create' | 'join' | undefined>();

  next(mode?: 'create' | 'join') {
    this.slideNext.emit(mode);
  }
}
