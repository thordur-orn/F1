import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-most-entries',
  templateUrl: './most-entries.component.html',
  styleUrls: ['./most-entries.component.css']
})
export class MostEntriesComponent implements OnInit {

  mostEntries: Driver[];

  constructor(private service: StatisticsService) { }

  ngOnInit(): void {
    this.getMostEntries();
  }

  getMostEntries(){
    this.service.getMostEntries()
      .subscribe(e => this.mostEntries = e.slice(0, 10));
  }

}
