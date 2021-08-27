import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { StatisticsService } from '../statistics.service';

@Component({
  selector: 'app-most-podiums',
  templateUrl: './most-podiums.component.html',
  styleUrls: ['./most-podiums.component.css']
})
export class MostPodiumsComponent implements OnInit {

  mostPodiums: Driver[];
  constructor(private service: StatisticsService) { }

  ngOnInit(): void {
    this.getMostPodiums();
  }

  getMostPodiums(){
    this.service.getMostPodiums()
      .subscribe(podiums => this.mostPodiums = podiums.slice(0, 10))
  }

}
