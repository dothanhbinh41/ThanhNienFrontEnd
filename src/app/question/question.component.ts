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
  startTime: number;
}
const timeStart = "startTime";

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
  ) { }

  ngOnInit(): void {
    this.studentValue = JSON.parse(localStorage.getItem('student'));
    if (!this.studentValue) {
      this.router.navigate(['login']);
    }

    this.questionService.getQuestions().subscribe(data => {
      var startTimeMis = this.getTimeStart();
      this.totalTime = data.items.length * 20;
      var use = Math.round((Date.now() - startTimeMis) / 1000);
      this.countDown = this.totalTime > use ? this.totalTime - use : 0;

      if (this.countDown) {
        (this.questions = data.items.map(c => new QuestionModel(c.id, c.text, c.answers, data.items.indexOf(c) + 1))); 
        this.countdown();
      }
    });
  }

  countdown() {
    let intervalId = setInterval(() => {
      this.countDown = this.countDown - 1;
      if (this.countDown === 0) clearInterval(intervalId)
    }, 1000)
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
      time: this.totalTime - this.countDown,
      answers: finished.map(d => ({ questionId: d.id, answerId: d.answer.id })),
    };

    // console.log(finished, this.questions)
    this.questionService.submitAnswers(request).subscribe(payload => {
      localStorage.removeItem(timeStart);
      this.toaster.success(payload.mark + "");
    });
  }

  getTimeStart() {
    if (this.studentValue.startTime) {
      return this.studentValue.startTime;
    }
    this.studentValue.startTime = Date.now();
    localStorage.setItem('student', JSON.stringify(this.studentValue));
    return this.studentValue.startTime;
  }
}
