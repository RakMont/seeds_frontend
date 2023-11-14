import { Injectable } from '@angular/core';
import firebase from "firebase/compat/app";
import 'firebase/compat/storage';
import {environment} from "../../../environments/environment";
import { initializeApp } from "firebase/app";
import {HttpHeaders} from "@angular/common/http";

firebase.initializeApp(environment.firebaseConfig)
//const app = initializeApp(environment.firebaseConfig);

@Injectable({
  providedIn: 'root'
})
export class FireStorageService {
  storageRef = firebase.app().storage().ref();

  constructor() { }


  async uploadImage(name: string, imgBase64: any){
    const headersObject = new HttpHeaders();

    try {
      console.log(imgBase64);

      let response = await this.storageRef.child("users/" + name).putString(imgBase64, 'data_url');
      console.log(response);
      return await response.ref.getDownloadURL();
    }catch (err){
      console.log("err", err);
      return null;
    }
  }
}
