import { Component } from '@angular/core';
import {AlertController, NavController, NavParams} from 'ionic-angular';

import { AuthProvider } from "../../providers/auth/auth";
import {AuthPage} from "../auth/auth";

@Component({
  selector: 'page-settings',
  templateUrl: 'settings.html',
})
export class SettingsPage {

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private authProvider: AuthProvider,
    private alertCtrl: AlertController) {
  }

  onDeleteAccount() {
    let alert = this.alertCtrl.create({
      title: 'Êtes-vous certain(e) de vouloir continuer ?',
      buttons: [
        {
          text: 'Annuler',
          role: 'cancel',
        },
        {
          text: 'Supprimer',
          handler: () => {
            this.authProvider.removeOneUser().subscribe(
              () => {
                this.authProvider.logout();
                this.navCtrl.setRoot(AuthPage, {mode: 'connect'});
              },
              (err) => {
                console.log(err);
              }
            )
          }
        }
      ]
    });
    alert.present();
  }
}
