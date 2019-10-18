import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { NavController, NavParams, ToastController, LoadingController } from 'ionic-angular';

import { AuthProvider } from "../../providers/auth/auth";
import {TabsPage} from "../tabs/tabs";

@Component({
  selector: 'page-auth',
  templateUrl: 'auth.html',
})
export class AuthPage implements OnInit {
  mode:         string;
  errorMessage: string;
  connectForm:  FormGroup;
  newForm:      FormGroup;

  constructor(
    private navCtrl:      NavController,
    private navParams:    NavParams,
    private formBuilder:  FormBuilder,
    private toastCtrl:    ToastController,
    private loadingCtrl:  LoadingController,
    private authProvider: AuthProvider
  ) { }

  ngOnInit() {
    this.mode = this.navParams.get('mode');
    this.initForm();
  }

  initForm() {
    this.newForm = this.formBuilder.group({
      username: ['', Validators.required],
      email:    ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.connectForm = this.formBuilder.group({
      user:     ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    let loader = this.loadingCtrl.create({
      content: "Connexion en cours..."
    });
    loader.present();

    if (this.mode === 'new') {
      const username = this.newForm.get('username').value;
      const email    = this.newForm.get('email').value;
      const password = this.newForm.get('password').value;

      this.authProvider.createOneUser(username, email, password).subscribe(
        () => {
          loader.dismiss();
          this.toastCtrl.create({
            message:  "Votre compte a été créer",
            duration: 3000,
            position: 'bottom'
          }).present();
          this.navCtrl.setRoot(AuthPage, {mode: 'connect'});
        },
        (error) => {
          loader.dismiss();
          this.errorMessage = error.error;
        }
      );
    } else if (this.mode === 'connect') {
      const user     = this.connectForm.get('user').value;
      const password = this.connectForm.get('password').value;

      this.authProvider.findOneUser(user, password).subscribe(
        (user) => {
          loader.dismiss();
          this.toastCtrl.create({
            message:  "Bonjour à vous, " + user[0].email,
            duration: 3000,
            position: 'bottom'
          }).present();
          this.authProvider.setToken(user[0].token);
          this.authProvider.emitUserContact();
          this.authProvider.login(user[0].token);
          this.navCtrl.setRoot(TabsPage);
        },
        (error) => {
          loader.dismiss();
          this.errorMessage = error.error;
        }
      );
    }
  }
}
