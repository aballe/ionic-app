import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { HttpClientModule } from "@angular/common/http";
import { IonicStorageModule } from "@ionic/storage";
import { Camera } from "@ionic-native/camera";
import { File } from "@ionic-native/file";
import { FileTransfer, FileUploadOptions, FileTransferObject } from '@ionic-native/file-transfer';

import { MyApp } from './app.component';

import { HomePage } from '../pages/home/home';
import { TabsPage } from '../pages/tabs/tabs';
import { ProfilePage } from '../pages/profile/profile';
import { MessagesPage } from '../pages/messages/messages';
import { AuthPage } from "../pages/auth/auth";
import { SettingsPage } from '../pages/settings/settings';
import { ListContactPage } from "../pages/messages/list-contact/list-contact";
import { SingleMessagePage } from "../pages/messages/single-message/single-message";

import { AuthProvider } from '../providers/auth/auth';

@NgModule({
  declarations: [
    MyApp,
    HomePage,
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
    HomePage,
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
    FileTransfer,
    FileTransferObject,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
  ]
})
export class AppModule {}
