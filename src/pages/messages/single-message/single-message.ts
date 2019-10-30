import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { AuthProvider } from "../../../providers/auth/auth";
import {User} from "../../../models/user.model";

@Component({
  selector: 'page-single-message',
  templateUrl: 'single-message.html',
})
export class SingleMessagePage implements OnInit {
  contact: User;
  user: User;
  messageText: string;
  messages: string[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider) {
    this.authProvider.messages.subscribe(
      (values) => {
        this.messages = values;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ionViewWillEnter() {
    this.authProvider.findOneUserContact(this.navParams.get('token')).subscribe(
      (value) => {
        this.contact = value[0];
      },
      (err) => {
        console.log(err);
      }
    );
    this.authProvider.findOneUserConnected().subscribe(
      (value) => {
        this.user = value;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  ionViewDidEnter() {
    const user    = this.user ? this.user.id : null;
    const contact = this.contact ? this.contact.id : null;
    this.authProvider.emitUserContactMessages(user, contact);
  }

  ngOnInit() { }

  onSendMessage() {
    this.authProvider.createOneUserContactMessage(this.messageText, this.user.id, this.contact.id).subscribe(
      () => {
        this.authProvider.emitUserContactMessages(this.user.id, this.contact.id);
      },
      (err) => {
        console.log(err);
      }
    );
    this.messageText = '';
  }
}
