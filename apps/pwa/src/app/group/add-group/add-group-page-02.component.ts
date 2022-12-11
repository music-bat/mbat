import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'mbat-add-group-page-02',
  template: `
    <div class="content-head">
      <img src="assets/img/add-group.svg" />
      <mbat-text size="l">Deine erste Gruppe</mbat-text>

      <ion-segment [ngModel]="mode" [hidden]="!mode">
        <ion-segment-button value="create" (click)="mode = 'create'">
          <ion-label>Gruppe erstellen</ion-label>
        </ion-segment-button>
        <ion-segment-button value="join" (click)="mode = 'join'" [disabled]="true">
          <ion-label>Gruppe Beitreten</ion-label>
        </ion-segment-button>
      </ion-segment>
    </div>

    <div class="content-body">
      <mbat-text size="m" mv="l" *ngIf="mode === 'create'">
        Du wirst der Leiter dieser Gruppe sein. Deine Lieblingssongs und die, der Gruppenmitglieder, werden anonym zu den Lieblingssongs der
        Gruppe hinzugefügt.
      </mbat-text>

      <mbat-text size="m" mv="l" *ngIf="mode === 'join'">
        <mbat-not-implemented-hint issueId="56" mode="toast" featureName="Join Group"></mbat-not-implemented-hint>
        Du wirst Mitglied einer Gruppe. Deine Lieblingssongs werden anonym zu den Lieblingssongs der Gruppe hinzugefügt.
      </mbat-text>
    </div>

    <div class="content-footer buttons flexbox ion-justify-content-end">
      <ion-button (click)="next()" [disabled]="mode === 'join'">
        <ion-label>Los geht's</ion-label>
        <ion-icon name="arrow-forward-outline" slot="end"></ion-icon>
      </ion-button>
    </div>
  `,
  styleUrls: ['add-group.page.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupPage02Component {
  @Output() slideNext = new EventEmitter<'create' | 'join' | undefined>();
  @Input() mode: 'create' | 'join';

  next(mode?: 'create' | 'join') {
    this.slideNext.emit(mode);
  }
}
