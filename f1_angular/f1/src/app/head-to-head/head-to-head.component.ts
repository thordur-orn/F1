import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-head-to-head',
  templateUrl: './head-to-head.component.html',
  styleUrls: ['./head-to-head.component.css']
})
export class HeadToHeadComponent implements OnInit {

  drivers: Driver[];
  years: Number[];
  driver1: Driver;
  driver2: Driver;
  year_driver1: number;
  year_driver2: number;

  constructor(private driverService: DriverService) { }

  ngOnInit(): void {
    this.years = [];
    this.getDrivers();
    this.fillYearsArray();
  }

  getDrivers(): void {
    this.driverService.getDrivers()
      .subscribe(drivers => {this.drivers = drivers;});
  }

  fillYearsArray(): void {
    for(let i=2021; i > 1949; i--){
      this.years.push(i);
    }
  }

  getDriverDetails(d1: string, d2: string): void {
    this.driverService.getDriver(+d1)
      .subscribe(driver => this.driver1 = driver)
    this.driverService.getDriver(+d2)
      .subscribe(driver => {this.driver2 = driver; console.log(this.driver1, this.driver2)})
  }
}
