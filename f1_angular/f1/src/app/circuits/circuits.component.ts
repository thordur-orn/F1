import { Component, OnInit } from '@angular/core';
import { Circuit } from '../circuit';
import { CircuitService } from '../circuit.service';

@Component({
  selector: 'app-circuits',
  templateUrl: './circuits.component.html',
  styleUrls: ['./circuits.component.css']
})
export class CircuitsComponent implements OnInit {
  circuits: Circuit[];

  constructor(private circuitService: CircuitService) { }

  ngOnInit(): void {
    this.getCircuits();
  }

  getCircuits(): void{
    this.circuitService.getCircuits()
      .subscribe(circuits => this.circuits = circuits);
  }

}
