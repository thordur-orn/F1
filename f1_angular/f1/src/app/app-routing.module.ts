import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CircuitDetailComponent } from './circuit-detail/circuit-detail.component';
import { CircuitsComponent } from './circuits/circuits.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { DriverDetailComponent } from './driver-detail/driver-detail.component';
import { DriversComponent } from './drivers/drivers.component';
import { HeadToHeadComponent } from './head-to-head/head-to-head.component';
import { StandingsComponent } from './standings/standings.component';
import { StatisticsComponent } from './statistics/statistics.component';
import { TeamDetailComponent } from './team-detail/team-detail.component';
import { TeamsComponent } from './teams/teams.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full' },
  { path: 'dashboard', component: DashboardComponent},
  { path: 'drivers', component: DriversComponent },
  { path: 'driver/:id', component: DriverDetailComponent},
  { path: 'teams', component: TeamsComponent},
  { path: 'team/:id', component: TeamDetailComponent },
  { path: 'circuits', component: CircuitsComponent},
  { path: 'circuit/:id', component: CircuitDetailComponent},
  { path: 'standings/:year', component: StandingsComponent},
  { path: 'statistics', component: StatisticsComponent},
  { path: 'headtohead', component: HeadToHeadComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }