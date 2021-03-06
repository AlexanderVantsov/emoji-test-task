import { Component, ElementRef, OnInit } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Message } from '../message';

@Component({
  selector: 'app-diary-form',
  templateUrl: './diary-form.component.html',
  styleUrls: ['./diary-form.component.scss']
})
export class DiaryFormComponent implements OnInit {

  constructor(private elm: ElementRef) { }

  public messages: Message[] = [];
  public open_emoji: boolean = false;
  

  ngOnInit(): void {
  }

  /**
   * Predefined emoji list
   */
  public customEmojis = ["grinning", "smiley", "smile", "grin", "laughing", "sweat_smile", "rolling_on_the_floor_laughing", "joy", "slightly_smiling_face", "upside_down_face", "wink", "blush", "innocent", "heart_eyes", "yum", "stuck_out_tongue", "stuck_out_tongue_winking_eye", "stuck_out_tongue_closed_eyes", "money_mouth_face", "hugging_face", "thinking_face", "zipper_mouth_face", "neutral_face", "expressionless", "smirk", "unamused", "face_with_rolling_eyes", "face_with_thermometer", "nauseated_face", "dizzy_face", "sunglasses", "nerd_face", "confounded", "persevere", "rage", "smiling_imp"];

  /**
   * Get user input
   */
  getUserInput() {
    const input = this.elm.nativeElement.querySelector('textarea');
    if(input) return input.value;
    return "";
  }

  /**
   * Clear user input emlement
   */
  clearUserInput() {
    const input = this.elm.nativeElement.querySelector('textarea');
    if(input) input.value = "";
  }

  /**
   * Add emoji to textarea field
   */
  addEmoji($event: any) {
    console.log("Emoji event", $event);
    let em: string = $event.emoji.native;
    const input = this.elm.nativeElement.querySelector('textarea');
    input.value = input.value + em;
    input.focus();
  }

  /**
   * Save message to buffer storage
   */
  save() {
    let mt = this.getUserInput();
    if(mt == "") {
      alert("Please enter your message!");
      return;
    }
    let m = new Message(mt);
    this.messages.push(m);
    this.clearUserInput();
  }

  /**
   * Open emoji tab
   */
  openEmoji() {
    this.open_emoji = true;
  }
  /**
   * Close emoji tab
   */
  hideEmoji() {
    this.open_emoji = false;
  }

}
