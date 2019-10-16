import { Component, ViewChild } from '@angular/core';
import { Platform, Nav, MenuController } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { Storage } from "@ionic/storage";

import { AuthProvider } from '../providers/auth/auth';
import { TabsPage } from '../pages/tabs/tabs';
import { AuthPage } from '../pages/auth/auth';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  constructor(
    platform:             Platform,
    statusBar:            StatusBar,
    splashScreen:         SplashScreen,
    private menuCtrl:     MenuController,
    private storage:      Storage,
    private authProvider: AuthProvider
  ) {
    platform.ready().then(() => {
      statusBar.styleDefault();
      splashScreen.hide();

      this.storage.ready().then(() => {
        this.storage.get('auth-token').then((state) => {
          if (state) {
            this.authProvider.setToken(state);
            this.nav.setRoot(TabsPage);
          } else {
            this.nav.setRoot(AuthPage, {mode: 'connect'});
          }
        });
      });
    });
  }

  onLogout() {
    this.authProvider.logout();
    this.nav.setRoot(AuthPage, {mode: 'connect'});
    this.menuCtrl.close();
  }
}
