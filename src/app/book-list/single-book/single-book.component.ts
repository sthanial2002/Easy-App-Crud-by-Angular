import { BookService } from './../../services/books.service';
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.css']
})
export class SingleBookComponent implements OnInit {
  book: Book;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute) {
   }

  ngOnInit() {
    this.book = new Book('', '', '');

    const id = this.route.snapshot.params.id;

    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;
      }
    );

  }

  onDeleteBook(book: Book) {

    const id = this.route.snapshot.params.id;

    this.bookService.removeBook(book, id);
    this.router.navigate(['/books']);
  }

  onEditBook() {
    const id = this.route.snapshot.params.id;
    this.router.navigate(['/books', 'edit', id]);

  }

  onBack() {
    this.router.navigate(['/books']);
  }

}
