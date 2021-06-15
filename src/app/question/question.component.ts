import { ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { SubmitAnswersRequestDto } from '@proxy/questions/dtos';
import { QuestionModel } from './question.model';

interface IStudent {
  name: string;
  phone: string;
  studentId: string;
  classroom: string;
}

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss'],
})
export class QuestionComponent implements OnInit {
  phone: string;
  name: string;
  questions: QuestionModel[];
  studentValue: IStudent;
  countDown: number;
  totalTime = 0;
  constructor(
    private questionService: QuestionService,
    private toaster: ToasterService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.studentValue = JSON.parse(localStorage.getItem('student'));
    if (!this.studentValue) {
      this.router.navigate(['login']);
    }

    this.questionService.getQuestions().subscribe(data => {
      this.totalTime = data.items.length * 20;
      this.countDown = this.totalTime;

      return (this.questions = data.items.map(c => new QuestionModel(c.id, c.text, c.answers)));
    });
  }

  onSave() {
    const finished = this.questions.filter(d => d.answer != null);
    if (finished.length === 0) {
      return;
    }
    let request: SubmitAnswersRequestDto;
    request = {
      ...this.studentValue,
      phone: String(this.studentValue.phone),
      time: 123,
      answers: finished.map(d => ({ questionId: d.id, answerId: d.answer.id })),
    };

    // console.log(finished, this.questions)
    this.questionService.submitAnswers(request).subscribe(payload => {});
  }
}
