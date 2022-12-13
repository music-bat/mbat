import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddGroupPage } from './add-group/add-group.page';

const routes: Routes = [
  {
    path: '',
    component: AddGroupPage
  },
  {
    path: 'add',
    component: AddGroupPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GroupRoutingModule {}
