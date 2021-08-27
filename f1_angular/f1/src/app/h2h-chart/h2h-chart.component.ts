import { Component, Input, OnInit } from '@angular/core';
import { Driver } from '../driver';

@Component({
  selector: 'app-h2h-chart',
  templateUrl: './h2h-chart.component.html',
  styleUrls: ['./h2h-chart.component.css']
})
export class H2hChartComponent implements OnInit {
  @Input() driver1: Driver;
  @Input() driver2: Driver;
  @Input() year_driver1: number;
  @Input() year_driver2: number;
  
  constructor() { }

  ngOnInit(): void {
  }

}
