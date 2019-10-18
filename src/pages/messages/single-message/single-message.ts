import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AuthProvider } from "../../../providers/auth/auth";
import {User} from "../../../models/user.model";

@Component({
  selector: 'page-single-message',
  templateUrl: 'single-message.html',
})
export class SingleMessagePage implements OnInit {
  messageForm: FormGroup;
  contact: User = new User();

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private formBuilder: FormBuilder,
    private authProvider: AuthProvider) { }

  ngOnInit() {
    this.initForm();
    this.authProvider.findOneUserContact(this.navParams.get('token')).subscribe(
      (value) => {
        this.contact = value[0];
      },
      (err) => {
        console.log(err);
      }
    );
  }

  initForm() {
    this.messageForm = this.formBuilder.group({
      message: ['', Validators.required],
    });
  }


  onSendMessage() {
    const message = this.messageForm.get('message').value;
    console.log(message);
  }
}
