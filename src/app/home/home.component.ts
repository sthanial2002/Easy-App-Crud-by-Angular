import { Data } from './../models/data.model';
import { Subscription } from 'rxjs';
import { Component, OnInit, Input } from '@angular/core';
import { DataService } from '../services/data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  @Input() title = 'Accueil';

  dataSubscription: Subscription;
  data: Data[];

  constructor(private dataService: DataService) {
  }

  ngOnInit() {
    this.dataSubscription = this.dataService.dataSubject.subscribe(
      (data: Data[]) => {
        this.data = data;
        console.log(this.data);
      }
    );
    this.dataService.emitDataSubject();
  }

}
