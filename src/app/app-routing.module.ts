import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LeaderboardComponent } from './leaderboard/leaderboard.component';
import { LoginComponent } from './login/login.component';
import { QuestionComponent } from './question/question.component';
import { ResultsComponent } from './results/results.component';
import { StartComponent } from './starts/start.component';
 
export const LOGIN_PATH : string ="login"; 
export const TEST_PATH : string ="test"; 
export const START_PATH : string ="start"; 
export const RESULT_PATH : string ="result";
export const LEADERBOARD_PATH : string ="top";

const routes: Routes = [
  {
    path: LOGIN_PATH,
    component: LoginComponent,
  },
  {
    path: TEST_PATH,
    component: QuestionComponent,
  },
  {
    path: START_PATH,
    component: StartComponent,
  },
  {
    path: RESULT_PATH,
    component: ResultsComponent,
  },
  {
    path: LEADERBOARD_PATH,
    component: LeaderboardComponent,
  },
  { path: '', redirectTo: LOGIN_PATH, pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { relativeLinkResolution: 'legacy' })],
  exports: [RouterModule],
})
export class AppRoutingModule { }
