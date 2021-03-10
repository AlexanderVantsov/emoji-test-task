import { Component, ElementRef, HostListener, OnInit } from '@angular/core';
import { from } from 'rxjs';
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
  public usertext: string = "";

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
    const input = this.elm.nativeElement.querySelector('#textinput');
    if(input) return input.innerHTML;
    return "";
  }

  /**
   * Clear user input emlement
   */
  clearUserInput() {
    const input = this.elm.nativeElement.querySelector('#textinput');
    if(input) input.innerHTML = "";
  }

  /**
   * Used to define sprite image
   */
  getEmojiSet(set: any, sheetSize: any) {
    //console.log("Set", set);
    //console.log("Sheet Size", sheetSize);
    return "/app/diary-form/images/sprite.png";
  }

  /**
   * Move cursor to the end of editable element
   */
  moveCursorToEnd(el: any) {
    var range,selection;
    if(document.createRange)//Firefox, Chrome, Opera, Safari, IE 9+
    {
        range = document.createRange();//Create a range (a range is a like the selection but invisible)
        range.selectNodeContents(el);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        selection = window.getSelection();//get the selection object (allows you to change selection)
        if(selection) selection.removeAllRanges();//remove any selections already made
        if(selection) selection.addRange(range);//make the range you have just created the visible selection
    }
    else if((document as any).selection)//IE 8 and lower
    { 
        range = (document as any).body.createTextRange();//Create a range (a range is a like the selection but invisible)
        range.moveToElementText(el);//Select the entire contents of the element with the range
        range.collapse(false);//collapse the range to the end point. false means collapse to end rather than the start
        range.select();//Select the range (make it the visible selection
    }
  }

  /**
   * Prevent appearing extra divs on enter key press
   */
  filterInputChars($event: any) {
    //console.log("Input event", $event);
    if ($event.keyCode === 13) {
      $event.target.insertAdjacentHTML('beforeend', "<br><br>");
      this.moveCursorToEnd($event.target);
      return false;
    }
    return true;
  }

  /**
   * Add emoji to textarea field
   */
  addEmoji($event: any) {
    console.log("Emoji event", $event);
    let sheetColumns = 58; // Number of columns in emoji sprite
    const multiply = 100 / (sheetColumns - 1); // Percentage for one column
    let sheetX = $event.emoji.sheet[0]; //  Define X for required emoji
    let sheetY = $event.emoji.sheet[1]; //  Define Y fro required emoji
    let x_pos = multiply * sheetX; // Calc x position
    let y_pos = multiply * sheetY; // Calc y position
    //  Prepare emoji html template
    let em_markup = `<span contenteditable="false" style="width: 16px; height: 16px; display: inline-block; line-heigth: 16px; 
                            background-image: url(${this.getEmojiSet($event.emoji.set, 64)}); 
                            background-size: 5800% 5700%; background-position: ${x_pos}% ${y_pos}%;"></span>`;
    const input = this.elm.nativeElement.querySelector('#textinput');
    this.usertext = this.usertext + em_markup;
    //  Add emoji to input text field
    if(input) {
      input.insertAdjacentHTML('beforeend', em_markup);
      this.moveCursorToEnd(input);
      input.focus();
    }
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
