import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-most-wins',
  templateUrl: './most-wins.component.html',
  styleUrls: ['./most-wins.component.css']
})
export class MostWinsComponent implements OnInit {

  mostWins: Driver[];

  constructor(private service: StatisticsService) { }

  ngOnInit(): void {
    this.getMostWins();
  }

  getMostWins(){
    this.service.getMostWins()
      .subscribe(wins => this.mostWins = wins.slice(0,10));
  }

}
