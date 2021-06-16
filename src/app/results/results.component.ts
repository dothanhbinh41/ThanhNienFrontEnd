import { Component, OnInit } from '@angular/core';
import { QuestionService } from '@proxy/questions';
import { IStudent } from '../question/question.component';

@Component({
  selector: 'app-results',
  templateUrl: './results.component.html',
  styleUrls: ['./results.component.scss']
})
export class ResultsComponent implements OnInit {

  mark: number;
  time: number;
  studentValue: IStudent;
  constructor(private questionService: QuestionService) { }

  async ngOnInit() {
    var result = await this.questionService.getAllUserResults(null).toPromise();
  }

}
