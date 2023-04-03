import { ChangeDetectionStrategy, Component, ViewChild } from '@angular/core';
import { Swiper } from 'swiper';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'mbat-add-group',
  templateUrl: './add-group.page.html',
  styleUrls: ['./add-group.page.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddGroupPage {
  mode: 'create' | 'join';

  @ViewChild('slider') slider: { swiper: { swiperRef: Swiper } };

  constructor(private navCtrl: NavController) {}

  next(mode?: 'create' | 'join') {
    if (mode) {
      this.mode = mode;
    }

    this.slider.swiper.swiperRef.slideNext();
  }

  async createGroup(ev) {
    const group = new Parse.Object('Group');
    group.set('image', ev.image);
    group.set('name', ev.name);
    group.set('description', ev.description);
    group.relation('moderators').add(Parse.User.current());


    await group.save();
    await group.pin();

    const groupRelation: Parse.Relation = await Parse.User.current().relation('groups');
    groupRelation.add(group);
    await Parse.User.current().save();

    return this.navCtrl.navigateRoot(['/']);
  }

  async joinGroup(ev) {
    await Parse.Cloud.run('joinGroupByInviteCode', { inviteCode: ev.inviteCode });

    return this.navCtrl.navigateRoot(['/']);
  }
}
