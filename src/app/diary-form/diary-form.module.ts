import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DiaryFormComponent } from './diary-form/diary-form.component';
import { MatIconModule } from '@angular/material/icon';
import { EmojiModule } from '@ctrl/ngx-emoji-mart/ngx-emoji';
import { BindhtmlPipe } from './pipes/bindhtml.pipe';


@NgModule({
  declarations: [
    DiaryFormComponent,
    BindhtmlPipe
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
