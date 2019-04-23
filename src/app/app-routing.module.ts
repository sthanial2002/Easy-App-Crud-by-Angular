import { ModifyBookComponent } from './modify-book/modify-book.component';
import { AuthGuardService } from './services/auth-guard.service';

import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';



import { HomeComponent } from './home/home.component';
import { SigninComponent } from './auth/signin/signin.component';
import { FormBookComponent } from './book-list/form-book/form-book.component';
import { SingleBookComponent } from './book-list/single-book/single-book.component';
import { BookListComponent } from './book-list/book-list.component';
import { SignupComponent } from './auth/signup/signup.component';
import { Error404Component } from './error404/error404.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'books', component: BookListComponent },
  { path: 'books/create', canActivate: [AuthGuardService], component: FormBookComponent },
  { path: 'books/show/:id', canActivate: [AuthGuardService], component: SingleBookComponent },
  { path: 'books/edit/:id', canActivate: [AuthGuardService], component: ModifyBookComponent },
  { path: 'auth/signin', component: SigninComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: '', component: HomeComponent },
  { path: 'not-found', component: Error404Component },
  { path: '**', redirectTo: '/books' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
