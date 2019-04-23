import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { BookService } from '../services/books.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Book } from '../models/book.model';

@Component({
  selector: 'app-modify-book',
  templateUrl: './modify-book.component.html',
  styleUrls: ['./modify-book.component.css']
})
export class ModifyBookComponent implements OnInit {

  book: Book;
  modifyBookForm: FormGroup;

  id: number;
  title: string;
  body: string;
  author: string;

  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;

  constructor(private bookService: BookService, private router: Router, private route: ActivatedRoute, private formBuilder: FormBuilder) { }

  ngOnInit() {
    const id = this.route.snapshot.params.id;

    this.bookService.getSingleBook(+id).then(
      (book: Book) => {
        this.book = book;

        this.title = this.book.title;
        this.body = this.book.body;
        this.author = this.book.author;
      }
    );

    this.initForm();

  }

  initForm() {
    this.modifyBookForm = this.formBuilder.group({
      title: [this.title, Validators.required],
      body: [this.body, Validators.required],
      author: [this.author, Validators.required],
    });
  }

  onSaveModifyBook() {

    const title = (this.modifyBookForm.get('title').value) ? (this.modifyBookForm.get('title').value) : (this.title) ;
    const body = (this.modifyBookForm.get('body').value) ? (this.modifyBookForm.get('body').value) : (this.body);
    const author = (this.modifyBookForm.get('author').value) ? (this.modifyBookForm.get('author').value) : (this.author) ;

    const editBook = new Book(title, body, author);

    if (this.fileUrl && this.fileUrl !== '') {
      editBook.photo = this.fileUrl;
    }

    const id = this.route.snapshot.params.id;

    this.bookService.editBook(editBook, id);
    this.router.navigate(['/books']);
  }

  onUploadFile(file: File) {
    this.fileIsUploading = true;
    this.bookService.uploadFile(file).then(
      (url: string) => {
        this.fileUrl = url;
        this.fileIsUploading = false;
        this.fileUploaded = true;
      }
    );
  }

  detectFiles(event) {
    this.onUploadFile(event.target.files[0]);
  }

}
