import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ListContactPage } from "./list-contact/list-contact";
import { SingleMessagePage } from "./single-message/single-message";
import { User } from "../../models/user.model";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  contactList: User[];
  userConnected: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController,
    private authProvider: AuthProvider
  ) { }

  ionViewWillEnter() {
    this.authProvider.emitUserContact();
    this.authProvider.userContact.subscribe(
      (values) => {
        this.contactList = values;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  onAddNewConversation() {
    let modal = this.modalCtrl.create(ListContactPage);
    modal.present();
  }

  onLoadMessage(token) {
    this.navCtrl.push(SingleMessagePage, {token: token});
  }
}
