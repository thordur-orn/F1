import { Component, OnInit } from '@angular/core';
import { Driver } from '../driver';
import { DriverService } from '../driver.service';

/// TODO: add pagination, add caching

@Component({
  selector: 'app-drivers',
  templateUrl: './drivers.component.html',
  styleUrls: ['./drivers.component.css']
})
export class DriversComponent implements OnInit {
  drivers: Driver[];
  
  constructor(private driverService: DriverService) { }  
  
  ngOnInit() {
    this.getDrivers();
  }
  
  getDrivers(): void {
    this.driverService.getDrivers()
      .subscribe(drivers => {this.drivers = drivers;});
  }
  
  // add(name: string): void {
  //   name = name.trim();
  //   if(!name) { return; }
    
  //   this.driverService.addDriver({name} as Driver)
  //     .subscribe(driver => {
  //       this.drivers.push(driver);
  //     })
  // }

  delete(driver: Driver): void {
    this.drivers = this.drivers.filter(d => d !== driver);
    this.driverService.deleteDriver(driver.id).subscribe();
  }
}
