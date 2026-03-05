import { Injectable } from '@angular/core';
import { FirebaseApp, initializeApp } from "firebase/app";

@Injectable({
  providedIn: 'root',
})
export class FirebaseService {
  

  firebaseConfig = {
   apiKey: "AIzaSyACZPL8MI2rVjugetdvA5tUZAs-uWJH-HQ",

  authDomain: "feed-reader-47a09.firebaseapp.com",

  projectId: "feed-reader-47a09",

  storageBucket: "feed-reader-47a09.firebasestorage.app",

  messagingSenderId: "392319237961",

  appId: "1:392319237961:web:cb06b1558de01dba396498"
  };

  app: FirebaseApp;

  constructor() {
    this.app = initializeApp(this.firebaseConfig);
  }
}
