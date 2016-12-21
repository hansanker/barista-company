import { Component, OnInit, Input } from '@angular/core';
import { AngularFire } from 'angularfire2';
import { Message } from '../../shared/message';
import { toast } from "angular2-materialize";
import { UtilService } from '../../core/util.service';
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
  messages: Message[] = [];

  constructor(private af: AngularFire, private utilService: UtilService) {
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
      this.utilService.triggerToast('New message was added');
      this.message = '';
    }, (err) => {
      this.utilService.triggerToast(err.message || 'An error occurred');
    })
  }

}
