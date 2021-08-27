import { Component, Input, OnInit, Output, SimpleChanges, EventEmitter } from '@angular/core';
import { DriverStandings } from '../driverStandings';
import { StandingsService } from '../standings.service';
@Component({
  selector: 'app-driver-standings',
  templateUrl: './driver-standings.component.html',
  styleUrls: ['./driver-standings.component.css']
})
export class DriverStandingsComponent implements OnInit {

  driverStandings: DriverStandings[];
  currentStandings: DriverStandings[];
  @Input() year: number = 2020;
  @Input() round: number = 1;
  @Output() rounds: EventEmitter<number> =   new EventEmitter();
  
  constructor(
    private driverStandingsService: StandingsService) { }

  ngOnInit(): void {
    this.getDriverStandingsByYear();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['year'] == undefined){
      this.getCurrentStandings();
    }
    else{
      this.getDriverStandingsByYear();
    }
  }

  getDriverStandingsByYear(): void{
    this.driverStandingsService.getDriverStandings(this.year)
      .subscribe(standings => {this.driverStandings = standings;this.getCurrentStandings();this.findLastRound()});
  }

  getCurrentStandings(): void{
    this.currentStandings = this.driverStandings.filter((s) => {return s.round == this.round});
  }

  private findLastRound() {
    let lastRound =  +this.driverStandings[this.driverStandings.length - 1].round;
    this.rounds.emit(lastRound);
  }
}
