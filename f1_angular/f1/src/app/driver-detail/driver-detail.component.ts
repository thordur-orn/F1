import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Driver } from '../driver';
import { DriverService } from '../driver.service';

@Component({
  selector: 'app-driver-detail',
  templateUrl: './driver-detail.component.html',
  styleUrls: ['./driver-detail.component.css']
})
export class DriverDetailComponent implements OnInit {  
  driver: Driver;

  constructor(
    private route: ActivatedRoute,
    private driverService: DriverService,
    private location: Location
  ) { }
    
  ngOnInit(): void {
    this.getDriver();
  }

  getDriver(): void {
    const driverId = Number(this.route.snapshot.paramMap.get('id'));
    this.driverService.getDriver(driverId)
      .subscribe((data) => {this.driver = data;console.log(this.driver)});
  }

  goBack(): void {
    this.location.back();
  }

  // save(): void {
  //   this.driverService.updateDriver(this.driver)
  //     .subscribe(() => this.goBack());
  // }

  // delete(): void {
  //   this.driverService.deleteDriver(this.driver.id)
  //     .subscribe(() => this.goBack());
  // }

}
