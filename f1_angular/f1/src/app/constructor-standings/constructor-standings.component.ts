import { Component, Input, OnInit } from '@angular/core';
import { ConstructorStandings } from '../constructorStandings';
import { StandingsService } from '../standings.service';

@Component({
  selector: 'app-constructor-standings',
  templateUrl: './constructor-standings.component.html',
  styleUrls: ['./constructor-standings.component.css']
})
export class ConstructorStandingsComponent implements OnInit {
  @Input() year: number;
  @Input() round: number;
  constructorStandings: ConstructorStandings[];
  
  constructor(private constructorStandingsService: StandingsService) { }

  ngOnInit(): void {
    this.getConstructorStandingsByYear();
  }

  ngOnChanges() {
    this.getConstructorStandingsByYear();
  }

  getConstructorStandingsByYear(){
    console.log(this.year);
    this.constructorStandingsService.getConstructorStandings(this.year)
      .subscribe(standings => {this.constructorStandings = standings; console.log(this.constructorStandings)});
  }

}
