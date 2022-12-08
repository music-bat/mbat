import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'mbat-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class Tab1Page {

  get username(): string {
    return Parse.User.current().getUsername()
  }
  constructor() {}
}
