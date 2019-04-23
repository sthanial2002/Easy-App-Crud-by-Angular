import { Component } from '@angular/core';
import * as firebase from 'firebase';
import { Title } from '@angular/platform-browser';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  constructor() {

    const config = {
      apiKey: 'AIzaSyCQTnVDGvo5Q5ugkK_mR17UOLMH1--bxHo',
      authDomain: 'http-client-demo-angular.firebaseapp.com',
      databaseURL: 'https://http-client-demo-angular.firebaseio.com',
      projectId: 'http-client-demo-angular',
      storageBucket: 'http-client-demo-angular.appspot.com',
      messagingSenderId: '548619796919'
    };
    firebase.initializeApp(config);
  }

  




}
