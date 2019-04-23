import { Component, OnInit, OnDestroy } from '@angular/core';
import { Book } from '../models/book.model';
import { Subscription } from 'rxjs';
import { BookService } from '../services/books.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.css']
})
export class BookListComponent implements OnInit, OnDestroy {

  books: Book[];
  bookSubscription: Subscription;

  constructor(private bookService: BookService, private router: Router) {

   }

  ngOnInit() {
    this.bookSubscription = this.bookService.bookSubject.subscribe(
      (books: any[]) => {
        this.books = books;
      },
      (error) => {
        console.log('Erreur :' + error);
      });
    this.bookService.getBooksFromDatabaseFirebase();
    this.bookService.emitBookSubject();

  }

  onViewBook(id: number) {
    this.router.navigate(['/books', 'show', id]);
  }

  ngOnDestroy() {
    this.bookSubscription.unsubscribe();
  }






}
