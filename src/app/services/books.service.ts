import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Book } from '../models/book.model';
import * as firebase from 'firebase';


@Injectable({
  providedIn: 'root'
})
export class BookService {

  books: Book[] = [];

  bookSubject = new Subject<Book[]>();

  constructor() {

  }


  emitBookSubject() {
    this.bookSubject.next(this.books);
  }

  saveBooksOnDatabaseFirebase() {
    firebase.database().ref('/books').set(this.books);
  }

  getBooksFromDatabaseFirebase() {
    firebase.database().ref('/books')
      .on('value', (data) => {
        this.books = data.val() ? data.val() : [];
        this.emitBookSubject();
      });

  }

  getSingleBook(id: number) {
    return new Promise(
      (resolve, reject) => {
        firebase.database().ref('/books/' + id).once('value').then(
          (data) => {
            resolve(data.val());
          }, (error) => {
            reject(error);
          }
        );
      }
    );
  }

  createNewBook(newBook: Book) {
    this.books.push(newBook);
    this.saveBooksOnDatabaseFirebase();
    this.emitBookSubject();
  }


/*
  removeBook(book: Book) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé !');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé' + error);
        }
      );
    }
    const bookIndexToRemove = this.books.findIndex(
      (bookAtRemove) => {
        if (bookAtRemove === book) {
          return true;
        }
        console.log(bookIndexToRemove);
      }
    );
    this.books.splice(bookIndexToRemove, 1);
    this.saveBooksOnDatabaseFirebase();
    this.emitBookSubject();
  }
*/

  removeBook(book: Book, id: number) {
    if (book.photo) {
      const storageRef = firebase.storage().refFromURL(book.photo);
      storageRef.delete().then(
        () => {
          console.log('Photo supprimé !');
        }
      ).catch(
        (error) => {
          console.log('Fichier non trouvé' + error);
        }
      );
    }

    this.books.splice(id, 1);
    this.saveBooksOnDatabaseFirebase();
    this.emitBookSubject();
  }

  /*
  editBook(editBook: Book) {
    const bookAtEditIndex = this.books.findIndex((
      (bookAtEdit: Book) => {
        if (bookAtEdit === editBook) {
          return true;
        }

      }
    ));
    this.books.splice(bookAtEditIndex, 1, editBook);
    this.saveBooksOnDatabaseFirebase();
    this.emitBookSubject();
  }
*/

  editBook(editBook: Book, id: number) {

    this.books.splice(id, 1, editBook);
    this.saveBooksOnDatabaseFirebase();
    this.emitBookSubject();
  }

  uploadFile(file: File) {
    return new Promise(
      (resolve, reject) => {
        const nameFileOfBook = Date.now().toString();
        const upload = firebase.storage().ref()
          .child('images/' + nameFileOfBook + file.name)
          .put(file);

        upload.on(firebase.storage.TaskEvent.STATE_CHANGED,
          () => {
            console.log('Chargement en cours ....');
          }, (error) => {
            console.log('Erreur de chargement' + error);
            reject();
          }, () => {
            resolve(upload.snapshot.ref.getDownloadURL());
          }
        );
      }
    );
  }

}
