import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Circuit } from '../circuit';
import { CircuitService } from '../circuit.service';

@Component({
  selector: 'app-circuit-detail',
  templateUrl: './circuit-detail.component.html',
  styleUrls: ['./circuit-detail.component.css']
})
export class CircuitDetailComponent implements OnInit {
  circuit: Circuit;

  constructor(
    private circuitService: CircuitService,
    private route: ActivatedRoute,
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getCircuit();
  }

  getCircuit(): void {
    const circuitId = Number(this.route.snapshot.paramMap.get('id'));
    this.circuitService.getCircuit(circuitId)
      .subscribe((data) => {this.circuit = data;console.log(this.circuit)});
  }

  goBack(): void {
    this.location.back();
  }
}
