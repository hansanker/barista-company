import { Component, OnInit, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Message } from '../../shared/message';
import { toast } from "angular2-materialize";
import * as firebase from 'firebase';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  @Input() checklistId: string;
  userId: string;
  message: string;
  messages: Message[];

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(authData => {
      if (authData) {
        this.userId = authData.uid;
      }
    });
  }

  ngOnInit() {
    firebase.database().ref(`checklists/${this.checklistId}/messages`)
      .on('child_added', (snapshot) => {
        this.messages.unshift(snapshot.val());
      });
  }

  sendMessage(messageForm: any) {
    let message = messageForm.message;
    this.af.database.list(`checklists/${this.checklistId}/messages`).push({
      text: message,
      time: firebase.database.ServerValue.TIMESTAMP,
      user: this.userId
    }).then(() => {
      this.triggerToast('New message was added');
      this.message = '';
    }, (err) => {
      this.triggerToast(err.message || 'An error occurred');
    })
  }

  private triggerToast(message: string) {
    toast(message, 3000);
  }

}
