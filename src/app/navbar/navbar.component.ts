import { AuthService } from './../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import * as firebase from 'firebase';
import { Title } from '@angular/platform-browser';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

  isAuth: boolean;

  constructor(private authService: AuthService, private router: Router, private title: Title) { }

  ngOnInit() {
    firebase.auth().onAuthStateChanged(
      (user) => {
        if (user) {
          this.isAuth = true;
        } else {
          this.isAuth = false;
        }
      }

    );
  }

  onSignOut() {
    this.authService.signOutUser();
    this.router.navigate(['/books']);
  }

  onNewBooks() {
    this.router.navigate(['/books', 'create']);
  }

  public setTitle(title: string) {
    this.title.setTitle(title);
  }

}
