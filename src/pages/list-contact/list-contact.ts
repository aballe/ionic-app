import { Component, OnInit } from '@angular/core';
import {NavController, NavParams, ViewController } from 'ionic-angular';

import { AuthProvider } from "../../providers/auth/auth";
import { User } from "../../models/user.model";

@Component({
  selector: 'page-list-contact',
  templateUrl: 'list-contact.html',
})
export class ListContactPage implements OnInit {
  contactList: User[];

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private viewCtrl: ViewController) { }

  ngOnInit() {
    this.authProvider.userList.subscribe(
      (values) => {
        this.contactList = values;
      },
      (err) => {
        console.log(err);
      }
    );
    this.authProvider.emitUsers();
  }

  onLoadContactMessage() {
    this.dismissModal();
  }

  dismissModal() {
    this.viewCtrl.dismiss();
  }
}
