import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-standings',
  templateUrl: './standings.component.html',
  styleUrls: ['./standings.component.css']
})
export class StandingsComponent implements OnInit {

  constructor(private route: ActivatedRoute) { }

  years: number[];
  rounds: number[];
  @Input() selectedYear: number = 2020;
  @Input() selectedRound: number = 1;

  ngOnInit(): void {
    this.years = [];
    this.rounds = [];
    this.fillYearsAndRounds();
    console.log(this.selectedRound)
  }
  
  changeYear(e: string) {
    this.selectedYear = +e;
    this.selectedRound = 1;
  }

  nextYear() {
    if(this.selectedYear != 2020){
      this.selectedYear += 1;
    }
    this.firstRound();
  }

  previousYear() {
    if(this.selectedYear != 1950){
      this.selectedYear -= 1;
    }
    this.firstRound();
  }

  firstYear() {
    this.selectedYear = 1950;
  }

  lastYear() {
    this.selectedYear = 2020;
  }

  firstRound() {
    this.selectedRound = 1;
  }

  changeRound(r: string) {
    this.selectedRound = +r;
  }

  lastRound() {
    this.selectedRound = 15;  // change to last round
  }

  increaseRound() {
    let r = document.getElementById('seasonResults');
    console.log(r)
    this.selectedRound += 1;
    console.log(this.selectedRound);
  }

  decreaseRound() {
    if(this.selectedRound != 1){
      this.selectedRound -= 1;
    }
    console.log(this.selectedRound);
  }

  private fillYearsAndRounds() {
    for(let i = 2020; i > 1949; i--){
      this.years.push(i);
    }
  }
}
