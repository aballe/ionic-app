import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { User } from "../../models/user.model";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  person: User = new User();

  constructor(
    private navCtrl: NavController,
    private navParams: NavParams,
    private authProvider: AuthProvider
  ) { }

  ionViewWillEnter() {
    this.authProvider.findOneUserConnected().subscribe(
      (user) => {
        this.person = user;
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
