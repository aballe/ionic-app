import { Component } from '@angular/core';
import { NavController, MenuController, NavParams } from 'ionic-angular';

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private menuCtrl: MenuController
  ) { }
}
