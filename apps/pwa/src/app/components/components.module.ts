import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { TextComponent } from "./text/text.component";
import { NotImplementedHintComponent } from "./not-implemented-hint/not-implemented-hint.component";

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule],
  exports: [TextComponent, NotImplementedHintComponent],
  declarations: [TextComponent, NotImplementedHintComponent],
})
export class ComponentsModule {}
