import { Component } from '@angular/core';
import { NavController, NavParams, ModalController } from 'ionic-angular';

import { ListContactPage } from "../list-contact/list-contact";
import { SingleMessagePage } from "./single-message/single-message";

@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private modalCtrl: ModalController
  ) { }

  onAddNewConversation() {
    let modal = this.modalCtrl.create(ListContactPage);
    modal.present();
  }

  onLoadMessage() {
    this.navCtrl.push(SingleMessagePage);
  }
}
