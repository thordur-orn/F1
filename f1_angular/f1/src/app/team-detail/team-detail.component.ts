import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Team } from '../team';
import { TeamService } from '../team.service';

@Component({
  selector: 'app-team-detail',
  templateUrl: './team-detail.component.html',
  styleUrls: ['./team-detail.component.css']
})
export class TeamDetailComponent implements OnInit {
  team: Team;

  constructor(
    private route: ActivatedRoute,
    private teamService: TeamService,
    private location: Location
  ) { }
    
  ngOnInit(): void {
    this.getTeam();
  }

  getTeam(): void {
    const teamId = Number(this.route.snapshot.paramMap.get('id'));
    this.teamService.getTeam(teamId)
      .subscribe((data) => {this.team = data;console.log(this.team)});
  }

  goBack(): void {
    this.location.back();
  }

}
