import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConstructorSeasonsService } from '../constructor-seasons.service';
import { TeamSeasons } from '../teamSeasons';

@Component({
  selector: 'app-constructor-seasons',
  templateUrl: './constructor-seasons.component.html',
  styleUrls: ['./constructor-seasons.component.css']
})
export class ConstructorSeasonsComponent implements OnInit {

  constructorSeasons: TeamSeasons[];
  
  constructor(
    private constructorSeasonsService: ConstructorSeasonsService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.getDriverSeasons();
  }

  ngOnChanges(): void{
    this.getDriverSeasons();
  }

  getDriverSeasons(): void {
    const teamId = Number(this.route.snapshot.paramMap.get('id'));
    this.constructorSeasonsService.getConstructorSeasons(teamId)
      .subscribe((data) => {this.constructorSeasons = data;console.log(this.constructorSeasons)});
  }

}
