import { Component, OnInit, ChangeDetectionStrategy, Input } from "@angular/core";
import { ToastController } from "@ionic/angular";

@Component({
  selector: 'mbat-not-implemented-hint',
  template: `
    <ion-card color="warning" *ngIf="mode === 'card'">
      <ion-card-title>Not yet implemented!</ion-card-title>
      <ion-card-content>
        The feature <ion-text color="tertiary">{{featureName}}</ion-text> is still in development.
        <ion-text *ngIf="issueId">Follow the development progress <a href="https://github.com/music-bat/mbat/issues/{{issueId}}">here</a>.</ion-text>
      </ion-card-content>

    </ion-card>
  `,
  styles: [
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NotImplementedHintComponent implements OnInit {

  @Input() featureName: string;
  @Input() issueId?: string;
  @Input() mode?: 'card' | 'toast' = 'toast';

    constructor(private toastController: ToastController) {}


  async presentToast(position: 'top' | 'middle' | 'bottom') {
    const toast = await this.toastController.create({
      message: `
      The feature "${this.featureName}" is still in development.
      Follow the development progress <a target="_blank" href="https://github.com/music-bat/mbat/issues/{{issueId}}">here</a>.
      `,
      duration: 15000,
      position: position,
      keyboardClose: true,
      buttons: [
        {
          text: 'OK',
          role: 'cancel'
        }
      ],
      color: 'warning'
    });

    await toast.present();
  }
  ngOnInit(): void {
    this.presentToast('top')
  }

}
