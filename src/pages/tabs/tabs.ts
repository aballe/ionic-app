import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';

import { ProfilePage } from '../profile/profile';
import { MessagesPage } from '../messages/messages';
@Component({
  selector: 'page-tabs',
  templateUrl: 'tabs.html'
})
export class TabsPage {

  profileRoot = ProfilePage;
  messagesRoot = MessagesPage;


  constructor(public navCtrl: NavController) {}

}
