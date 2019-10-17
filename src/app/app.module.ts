import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { Camera } from "@ionic-native/camera/ngx";
import { File } from "@ionic-native/file/ngx";

import { MyApp } from './app.component';

import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { MessagesPage } from '../pages/messages/messages';
import { AuthPage } from "../pages/auth/auth";
import { SettingsPage } from '../pages/settings/settings';
import { AuthProvider } from '../providers/auth/auth';
import { ListContactPage } from "../pages/list-contact/list-contact";
import { SingleMessagePage } from "../pages/messages/single-message/single-message";

@NgModule({
  declarations: [
    MyApp,
    TabsPage,
    MessagesPage,
    ProfilePage,
    AuthPage,
    SettingsPage,
    ListContactPage,
    SingleMessagePage
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicStorageModule.forRoot(),
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    TabsPage,
    MessagesPage,
    ProfilePage,
    AuthPage,
    SettingsPage,
    ListContactPage,
    SingleMessagePage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    AuthProvider,
    Camera,
    File,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
