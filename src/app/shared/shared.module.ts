import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MomentModule } from 'angular2-moment';

import { MessagesComponent } from './messages/messages.component';

@NgModule({
  declarations: [MessagesComponent],
  exports: [MessagesComponent],
  imports: [CommonModule, FormsModule, MomentModule]
})
export class SharedModule { }
