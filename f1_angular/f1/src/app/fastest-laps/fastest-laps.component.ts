import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-fastest-laps',
  templateUrl: './fastest-laps.component.html',
  styleUrls: ['./fastest-laps.component.css']
})
export class FastestLapsComponent implements OnInit {

  fastestLaps: Driver[];

  constructor(private service: StatisticsService) { }

  ngOnInit(): void {
    this.getFastestLaps();
  }

  getFastestLaps(){
    this.service.getFastestLaps()
      .subscribe(f => this.fastestLaps = f.slice(0, 10));
  }

}
