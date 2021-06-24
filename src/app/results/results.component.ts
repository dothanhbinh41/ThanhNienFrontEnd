import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { UserResultDto } from '@proxy/questions/dtos';
import { LEADERBOARD_PATH, LOGIN_PATH } from '../app-routing.module';
import { IStudent, resultKey, studentKey } from '../question/question.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  studentValue: IStudent = JSON.parse(localStorage.getItem(studentKey)) as IStudent;
  result: UserResultDto = { mark: 0, time: 0, department:{} };
  constructor(private questionService: QuestionService, private router: Router) { }

  ngOnInit() {
    const tempdata = localStorage.getItem(resultKey);
    if (tempdata) {
      this.result = JSON.parse(tempdata);
    } else {
      this.questionService
        .getResult(this.studentValue.phone)
        .subscribe(data => {
          this.result = data;
        });
    }
  }

  leaderBoard(){ 
    localStorage.clear();
    this.router.navigateByUrl(LEADERBOARD_PATH);
  }

  logOut() {
    localStorage.clear();
    this.router.navigateByUrl(LOGIN_PATH);
  }
}
