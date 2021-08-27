import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CircuitService } from '../circuit.service';
import { RaceWinner } from '../raceWinners';

@Component({
  selector: 'app-circuit-winners',
  templateUrl: './circuit-winners.component.html',
  styleUrls: ['./circuit-winners.component.css']
})
export class CircuitWinnersComponent implements OnInit {

  winners: RaceWinner[];
  constructor(
    private circuitService: CircuitService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getWinners();
  }

  getWinners(): void {
    const circuitId = Number(this.route.snapshot.paramMap.get('id'));
    this.circuitService.getCircuitWinners(circuitId)
      .subscribe((data) => {this.winners = data;console.log(this.winners);});
  }
}
