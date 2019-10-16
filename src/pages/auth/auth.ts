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
  mode: string;
  authForm: FormGroup;
  errorMessage: string;

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
    this.authForm = this.formBuilder.group({
      user: ['', Validators.required],
      password: ['', Validators.required]
    });
  }

  onSubmitForm() {
    let loader = this.loadingCtrl.create({
      content: "Connexion en cours..."
    });
    loader.present();

    const user     = this.authForm.get('user').value;
    const password = this.authForm.get('password').value;

    if (this.mode === 'new') {
      this.authProvider.createOneUser(user, password).subscribe(
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
      this.authProvider.findOneUser(user, password).subscribe(
        (user) => {
          loader.dismiss();
          this.toastCtrl.create({
            message:  "Bonjour à vous, " + user[0].email,
            duration: 3000,
            position: 'bottom'
          }).present();
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
