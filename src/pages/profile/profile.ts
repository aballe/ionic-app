import { Component } from '@angular/core';

import { User } from "../../models/user.model";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage {
  person: User = new User();
  processing: boolean;

  constructor(
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

  onChangeProfile() {
    this.authProvider.updateOneUserConnected(this.person).subscribe(
      (res) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  presentActionSheet(fileLoader) {
    /*var that = this;
    fileLoader.click();
    fileLoader.onchange = function () {
      var file = fileLoader.files[0];
      var reader = new FileReader();

      reader.addEventListener("load", function () {
        that.processing       = true;
        that.person.photo = reader.result;
        that.onChangeProfile();
      }, false);
      if (file) {
        reader.readAsDataURL(file);
      }
    }*/
  }

  imageLoaded(){
    /*this.processing = false;*/
  }
}
