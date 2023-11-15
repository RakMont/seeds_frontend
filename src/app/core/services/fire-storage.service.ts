import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import {environment} from "../../../environments/environment";
import { initializeApp } from "firebase/app";
import {AngularFireStorage} from "@angular/fire/compat/storage";
firebase.initializeApp(environment.firebaseConfig)
//const app = initializeApp(environment.firebaseConfig);
import { getStorage, ref, deleteObject } from "firebase/storage";

const storage = getStorage();


@Injectable({
  providedIn: 'root'
})
export class FireStorageService {
  storageRef = firebase.app().storage().ref();

  constructor(private fireStorage:AngularFireStorage) { }


  async sendingImageToFireBase(firebaseFile: any){
    try {
      const filename = "activity" + Date.now();
      const path = `activities/${filename}`
      const uploadTask =await this.fireStorage.upload(path,firebaseFile)
      return await uploadTask.ref.getDownloadURL()
    }
    catch (err){
      return null;

    }
  }

  async deleteFileFromFB(downloadUrl){
    try {
      return await this.fireStorage.storage.refFromURL(downloadUrl).delete();
    }catch (err){
      return null;
    }
  }
}
