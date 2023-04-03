import { Component } from '@angular/core';

@Component({
  selector: 'mbat-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
})
export class Tab3Page {
  group: { objectId: string; name: string; description: string; members: any[] };
  user = Parse.User.current();
  groupInviteCode: string;

  constructor() {
    this.initGroup().then(this.loadCurrentInviteCode.bind(this));
    
  }

  async isModerator() {
    const moderatorRole = await new Parse.Query(Parse.Role).equalTo('name', `${this.group?.objectId}-moderator`).first();

    return moderatorRole?.getUsers().query().equalTo('objectId', this.user.id).first();
  }

  async loadCurrentInviteCode() {
    this.groupInviteCode = await new Parse.Query('GroupInviteCode')
      .equalTo('group', Parse.Object.fromJSON({ className: 'Group', objectId: this.group.objectId }).toPointer())
      .first()
      .then((inviteCode) => {
        return inviteCode?.get('code');
      });
  }

  async createGroupInviteCode() {
    const group = await this.user.relation('groups').query().first();
    const inviteCode = await Parse.Cloud.run('createGroupInvite', { groupId: group.id });
    this.groupInviteCode = inviteCode.attributes.code;
  }

  async joinGroupByInviteCode() {
    const group = await Parse.Cloud.run('joinGroupByInviteCode', { inviteCode: this.groupInviteCode });
    this.group = group.toJSON() as any;
  }

  async deleteGroupInviteCode() {
    await Parse.Cloud.run('deleteGroupInvite', { inviteCode: this.groupInviteCode  });
    this.groupInviteCode = null;
  }

  /**
   * Copy the passed value to the clipboard
   * @param value The value to copy
   * @returns A promise that resolves when the value is copied
   */
  copyToClipboard(value: string) {
    return navigator.clipboard.writeText(value);
  }

  async initGroup() {
    // In the MVP status of this app there is only one group per user
    const group: Parse.Object = await this.user.relation('groups').query().first();
    this.group = group.toJSON() as any;
    console.log(group.attributes);
  }
}
