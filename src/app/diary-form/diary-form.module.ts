import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryFormComponent } from './diary-form/diary-form.component';
import { MatIconModule } from '@angular/material/icon';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';


@NgModule({
  declarations: [
    DiaryFormComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    EmojiModule
  ],
  exports: [
    DiaryFormComponent
  ]
})
export class DiaryFormModule { }
