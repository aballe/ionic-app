import { Component, OnInit } from '@angular/core';

import { User } from "../../models/user.model";
import { AuthProvider } from "../../providers/auth/auth";
import { ToastController, AlertController, normalizeURL } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { File, Entry } from '@ionic-native/file';

declare var cordova: any;

@Component({
  selector: 'page-profile',
  templateUrl: 'profile.html',
})
export class ProfilePage implements OnInit {
  person: User = new User();
  processing: boolean;
  imageUrl;
  options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    encodingType: this.camera.EncodingType.JPEG,
    mediaType: this.camera.MediaType.PICTURE
  };

  constructor(
    private authProvider: AuthProvider,
    private camera: Camera,
    private toastCtrl: ToastController,
    private alertCtrl: AlertController,
    private file: File
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

  onTakePhoto() {
    this.camera.getPicture(this.options).then(
      (data) => {
        if (data) {
          const path = data.replace(/[^\/]*$/, '');
          const filename = data.replace(/^.*[\\\/]/, '');
          const targetDirectory = cordova.file.dataDirectory;
          this.file.moveFile(path, filename, targetDirectory, filename)
            .then(
              (dataFile: Entry) => {
                this.imageUrl = normalizeURL(dataFile.nativeURL);
                let alert = this.alertCtrl.create({
                  title: 'Confirm purchase',
                  message: this.imageUrl,
                  buttons: [
                    {
                      text: 'Cancel',
                      role: 'cancel',
                      handler: () => {
                        console.log('Cancel clicked');
                      }
                    },
                    {
                      text: 'Buy',
                      handler: () => {
                        console.log('Buy clicked');
                      }
                    }
                  ]
                });
                alert.present();
              }
            )
            .catch(
              (error) => {
                this.toastCtrl.create({
                  message: error,
                  duration: 3000,
                  position: 'bottom'
                }).present();
                this.camera.cleanup();
              }
            )
        }
      }
    ).catch(
      (error) => {
        this.toastCtrl.create({
          message: error,
          duration: 3000,
          position: 'bottom'
        }).present();
      }
    );
  }

  uploadImage() {
    
  }
}
