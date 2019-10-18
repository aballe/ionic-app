import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController } from 'ionic-angular';

import { AuthProvider } from "../../../providers/auth/auth";
import { User } from "../../../models/user.model";

@Component({
  selector: 'page-list-contact',
  templateUrl: 'list-contact.html',
})
export class ListContactPage implements OnInit {
  contactList: User[];
  userConnected: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private viewCtrl: ViewController) { }

  ngOnInit() {
    this.authProvider.emitUserNotContact();
    this.authProvider.userNotContact.subscribe(
      (values) => {
        this.contactList = values;
      },
      (err) => {
        console.log(err);
      }
    );

    this.authProvider.findOneUserConnected().subscribe(
      (user) => {
        this.userConnected = user;
      },
      (err) => {
        console.log(err);
      }
    );

  }

  onLoadContactMessage(contact_email) {
    this.authProvider.createOneUserContact(this.userConnected.email, contact_email).subscribe(
      () => {
        this.authProvider.emitUserContact();
      },
      (err) => {
        console.log(err);
      }
    );
    this.dismissModal();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }
}
