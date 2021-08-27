import { ChangeDetectionStrategy, Component, Input, OnInit, SimpleChange, SimpleChanges } from '@angular/core';
import { SeasonResultsService } from '../season-results.service';
import { SeasonResults } from '../seasonResults';

@Component({
  selector: 'app-season-results',
  templateUrl: './season-results.component.html',
  styleUrls: ['./season-results.component.css']
})
export class SeasonResultsComponent implements OnInit {

  results: SeasonResults[];
  selectedRoundResult: SeasonResults;
  @Input() year: number = 2020;
  @Input() round: number = 1;

  constructor(private resultsService: SeasonResultsService) { }

  ngOnInit(): void {
    this.getSeasonResults();
  }

  ngOnChanges(changes: SimpleChanges) {
    console.log(changes['year'])
    if(changes['year'] == undefined){
      this.getSelectedRoundResult();
    }
    else{
      console.log('getSeasonResults')
      this.getSeasonResults();
    }
    //this.getSelectedRoundResult();
  }

  getSeasonResults(){
    this.resultsService.getResults(this.year)
      .subscribe(res => {this.results = res;this.getSelectedRoundResult()});
  }

  getSelectedRoundResult(){
    console.log(this.results)
    this.selectedRoundResult = this.results.filter((r) => {return r.round == this.round})[0];
  }

}
