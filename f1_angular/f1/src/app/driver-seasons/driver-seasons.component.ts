import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DriverSeasonsService } from '../driver-seasons.service';
import { DriverSeasons } from '../driverSeasons';

@Component({
  selector: 'app-driver-seasons',
  templateUrl: './driver-seasons.component.html',
  styleUrls: ['./driver-seasons.component.css']
})
export class DriverSeasonsComponent implements OnInit {
  driverSeasons: DriverSeasons[];
  
  constructor(
    private driverSeasonsService: DriverSeasonsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDriverSeasons();
  }

  ngOnChanges(): void{
    this.getDriverSeasons();
  }

  getDriverSeasons(): void {
    const driverId = Number(this.route.snapshot.paramMap.get('id'));
    this.driverSeasonsService.getDriverSeasons(driverId)
      .subscribe((data) => {this.driverSeasons = data;});
  }

}
