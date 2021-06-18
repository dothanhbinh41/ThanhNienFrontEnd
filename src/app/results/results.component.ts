import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { IStudent, questionKey, studentKey, timeLeftKey } from '../question/question.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss'],
})
export class ResultsComponent implements OnInit {
  mark: number;
  time: number;
  studentValue: IStudent = JSON.parse(localStorage.getItem(studentKey)) as IStudent;
  result: any;
  constructor(private questionService: QuestionService, private router: Router) {}

  ngOnInit() {
    if (this.questionService.resultStudent) {
      this.result = this.questionService.resultStudent;
    } else {
      this.questionService
        .getResult(this.studentValue.phone)
        .toPromise()
        .then(data => {
          this.result = data;
        });
    }
  }

  logOut() {
    localStorage.setItem(studentKey, null);
    localStorage.setItem(timeLeftKey, null);
    localStorage.setItem(questionKey, null);

    this.router.navigate(['login']);
  }
}
