import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { DriversComponent } from './drivers/drivers.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import { MessagesComponent } from './messages/messages.component';
import { DashboardComponent } from './dashboard/dashboard.component';

import { DriverSearchComponent } from './driver-search/driver-search.component';
import { TeamsComponent } from './teams/teams.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { CircuitsComponent } from './circuits/circuits.component';
import { CircuitDetailComponent } from './circuit-detail/circuit-detail.component';
import { ConstructorStandingsComponent } from './constructor-standings/constructor-standings.component';
import { DriverStandingsComponent } from './driver-standings/driver-standings.component';
import { StandingsComponent } from './standings/standings.component';
import { SeasonResultsComponent } from './season-results/season-results.component';
import { RacesComponent } from './races/races.component';
import { DriverSeasonsComponent } from './driver-seasons/driver-seasons.component';
import { ConstructorSeasonsComponent } from './constructor-seasons/constructor-seasons.component';
import { TeamDriversComponent } from './team-drivers/team-drivers.component';
import { CircuitWinnersComponent } from './circuit-winners/circuit-winners.component';
import { OrdinalPipe } from './ordinal-pipe';
import { RaceTimePipe } from './race-time-pipe';
import { ShortNamePipe } from './short-name-pipe';
import { StatisticsComponent } from './statistics/statistics.component';
import { MostWinsComponent } from './most-wins/most-wins.component';
import { MostPodiumsComponent } from './most-podiums/most-podiums.component';
import { FastestLapsComponent } from './fastest-laps/fastest-laps.component';
import { MostEntriesComponent } from './most-entries/most-entries.component';
import { MostPolesComponent } from './most-poles/most-poles.component';
import { TeamSearchComponent } from './team-search/team-search.component';
import { HeadToHeadComponent } from './head-to-head/head-to-head.component';
import { H2hChartComponent } from './h2h-chart/h2h-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    DriversComponent,
    DriverDetailComponent,
    MessagesComponent,
    DashboardComponent,
    DriverSearchComponent,
    TeamsComponent,
    TeamDetailComponent,
    CircuitsComponent,
    CircuitDetailComponent,
    ConstructorStandingsComponent,
    DriverStandingsComponent,
    StandingsComponent,
    SeasonResultsComponent,
    RacesComponent,
    DriverSeasonsComponent,
    ConstructorSeasonsComponent,
    TeamDriversComponent,
    CircuitWinnersComponent,
    OrdinalPipe,
    RaceTimePipe,
    ShortNamePipe,
    StatisticsComponent,
    MostWinsComponent,
    MostPodiumsComponent,
    FastestLapsComponent,
    MostEntriesComponent,
    MostPolesComponent,
    TeamSearchComponent,
    HeadToHeadComponent,
    H2hChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
