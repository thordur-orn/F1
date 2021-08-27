import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-most-poles',
  templateUrl: './most-poles.component.html',
  styleUrls: ['./most-poles.component.css']
})
export class MostPolesComponent implements OnInit {

  poles: Driver[];

  constructor(private service: StatisticsService) { }

  ngOnInit(): void {
    this.getMostPoles();
  }

  getMostPoles(){
    this.service.getMostPoles()
      .subscribe(p => this.poles = p.slice(0, 10));
  }

}
