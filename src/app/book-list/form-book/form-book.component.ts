import { BookService } from './../../services/books.service';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Component({
  selector: 'app-form-book',
  templateUrl: './form-book.component.html',
  styleUrls: ['./form-book.component.css']
})
export class FormBookComponent implements OnInit {

	bookForm: FormGroup;
	
  fileIsUploading = false;
  fileUrl: string;
  fileUploaded = false;


  constructor(private formBuilder: FormBuilder, private bookService: BookService, private router: Router) { }



  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.bookForm = this.formBuilder.group({
      title: ['', Validators.required],
      body: ['', Validators.required],
      author: ['', Validators.required],
    });
  }

  onSaveBook() {
    const title = this.bookForm.get('title').value;
    const body = this.bookForm.get('body').value;
    const author = this.bookForm.get('author').value;

    const newBook = new Book(title, body, author);

    if (this.fileUrl && this.fileUrl !== '') {
      newBook.photo = this.fileUrl;
    }

    this.bookService.createNewBook(newBook);
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
