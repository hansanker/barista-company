import { Component, OnInit, EventEmitter } from '@angular/core';
import {toast } from "angular2-materialize";
import { AngularFire } from 'angularfire2';
import { UtilService } from '../core/util.service';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  userRef: any;
  updatingImage = false;
  updatingProfile = false;

  constructor(private af: AngularFire, private utilService: UtilService) {
    this.af.auth.subscribe(authData => {
      if (authData) {
        this.userRef = this.af.database.object(`users/${authData.uid}`);
        this.userRef.subscribe(userData => {
          this.user = userData;
        });
      } else {
        this.user = null;
      }
    });
  }

  ngOnInit() {
  }

  getProfileImage(user: any) {
    return user.image || 'https://www.vx.nl/assets/images/avatar-placeholder.jpg';
  }

  changeImage(event) {
    this.updatingImage = true;
    let files = event.target.files;
    if (FileReader && files && files.length) {
      let fr = new FileReader();
      fr.onload = () => {
        this.updateProfileImage(fr.result).then(() => {
          this.updatingImage = false;
          this.utilService.triggerToast('Your image was updated');
        }, (err) => {
          this.updatingImage = false;
          this.utilService.triggerToast(err.message || 'An error occurred');
        })
      };
      fr.readAsArrayBuffer(files[0]);
    }
  }

  updateProfile(profileForm: any) {
    this.updatingProfile = true;
    this.userRef.update({
      name: profileForm.name
    }).then(
      () => {
        this.updatingProfile = false;
        this.utilService.triggerToast('Your profile was updated');
      },
      (err) => {
        this.updatingProfile = false;
        this.utilService.triggerToast(err.message || 'An error occurred');
      }
    );
  }

  private updateProfileImage(image: string) {
    return new Promise((resolve,reject) => {
      this.uploadImage(image).then(imageUrl => {
        this.userRef.update({
          image: imageUrl
        }).then(
          () => resolve(),
          (err) => reject(err)
        );
      });
    });
  }

  private uploadImage(image: string) {
    return new Promise((resolve, reject) => {
      let storage = firebase.storage().ref();
      let imgRef = storage.child(`images/${this.user.$key}`);
      let uploadTask = imgRef.put(image);
      uploadTask.on('state_changed',
        () => {},
        (err) =>  { reject(err); },
        () => {
          resolve(uploadTask.snapshot.downloadURL);
        });
    });
  }

}
