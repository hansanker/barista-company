import { Component, OnInit } from '@angular/core';
import { AngularFire } from 'angularfire2';
import * as firebase from 'firebase';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

  user: any;
  userRef: any;
  newImage: string;

  constructor(private af: AngularFire) {
    this.af.auth.subscribe(authData => {
      if (authData) {
        this.userRef = this.af.database.object(`users/${authData.uid}`);
        this.userRef.subscribe(userData => {
          this.user = userData;
          this.newImage = null;
        });
      } else {
        this.user = null;
      }
    });
  }

  ngOnInit() {
  }

  getNewImage(event) {
    let files = event.target.files;
    if (FileReader && files && files.length) {
      let fr = new FileReader();
      fr.onload = () => {
        this.newImage = fr.result;
      };
      fr.readAsArrayBuffer(files[0]);
    }
  }

  submit(profileForm: any) {
    if (this.newImage) {
      this.uploadFile().then(imageUrl => {
        this.updateProfile({
          name: profileForm.name,
          image: imageUrl
        });
      })
    } else {
      this.updateProfile({
        name: profileForm.name
      });
    }
  }

  private updateProfile(newProfile) {
    this.userRef.update(newProfile);
  }

  private uploadFile() {
    return new Promise((resolve, reject) => {
      let storage = firebase.storage().ref();
      let imgRef = storage.child(`images/${this.user.$key}`);
      let uploadTask = imgRef.put(this.newImage);
      uploadTask.on('state_changed',
        () => {},
        (err) =>  { reject(err); },
        () => {
          resolve(uploadTask.snapshot.downloadURL);
        });
    });
  }

}
