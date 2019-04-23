import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Data } from '../models/data.model';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  data: Data[];
  dataSubject = new Subject<Data[]>();

  constructor(private httpClient: HttpClient) { }

  emitDataSubject() {
    this.dataSubject.next(this.data);
  }

  getDataFromApi() {
    this.httpClient
      .get<any[]>('https://newsapi.org/v2/top-headlines?country=fr&apiKey=f48cab2a684e4ec5a3e24ce8817cc89d')
      .subscribe(
        (response) => {
          this.data = response;
          this.emitDataSubject();
        }, (error) => {
          console.log(error);
        }
    );
    return this.data;
  }
}
