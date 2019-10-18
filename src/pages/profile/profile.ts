import { Component, OnInit } from '@angular/core';

import { User } from "../../models/user.model";
import { AuthProvider } from "../../providers/auth/auth";

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  person: User = new User();
  processing: boolean;

  constructor(
    private authProvider: AuthProvider
  ) { }

  ngOnInit() {
    this.getUser();
  }

  getUser() {
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
}
