import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Driver } from '../driver';
import { TeamDriversService } from '../team-drivers.service';

@Component({
  selector: 'app-team-drivers',
  templateUrl: './team-drivers.component.html',
  styleUrls: ['./team-drivers.component.css']
})
export class TeamDriversComponent implements OnInit {

  drivers: Driver[];
  
  constructor(
    private driverService: TeamDriversService,
    private route: ActivatedRoute) { }  
  
  ngOnInit() {
    this.getDrivers();
  }
  
  getDrivers(): void {
    const id = Number(this.route.snapshot.paramMap.get('id'));
    this.driverService.getDrivers(id)
      .subscribe(drivers => {this.drivers = drivers;console.log(this.drivers)});
  }

}
