import { ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { QuestionDto, SubmitAnswersRequestDto } from '@proxy/questions/dtos';
import { QuestionModel } from './question.model';

export const questionKey = 'question';
export const timeLeftKey = 'timeleft';
export const studentKey = 'student';
export const TimeToProcess = 20; //second

export interface IStudent {
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
  data: QuestionDto[];
  studentValue: IStudent;
  totalTime = 0;
  timeleft: number;
  started: boolean;

  constructor(
    private questionService: QuestionService,
    private toaster: ToasterService,
    private confirmationService: ConfirmationService,
    private router: Router
  ) { }

  ngOnInit() {
    this.studentValue = JSON.parse(localStorage.getItem(studentKey));
    this.data = JSON.parse(localStorage.getItem(questionKey));
    if (!this.data) {
      this.router.navigate(['login']);
    }
  }

  countdown() {
    let intervalId = setInterval(() => {
      this.timeleft -= 1;
      localStorage.setItem(timeLeftKey, this.timeleft.toString());
      if (this.timeleft === 0) {
        clearInterval(intervalId);
      }
    }, 1000)
  }

  async onSave() {
    const finished = this.questions.filter(d => d.answer != null);
    if (finished.length === 0) {
      this.toaster.error("Bạn cần trả lời ít nhất 1 câu hỏi", "Lỗi");
      return;
    }
    let request: SubmitAnswersRequestDto;
    request = {
      ...this.studentValue,
      phone: String(this.studentValue.phone),
      time: this.totalTime - this.timeleft,
      answers: finished.map(d => ({ questionId: d.id, answerId: d.answer.id })),
    };

    var result = await this.questionService.submitAnswers(request).toPromise();
    if (result) {
      this.removeTemp();
      this.toaster.success(result.mark + "");
    }
    else {
      this.toaster.error("Không nộp được bài", "Không nộp được bài");
    }
  }

  onStart() {
    this.started = true;
    this.setTimeleft();
    this.questions = this.data.map(c => new QuestionModel(c.id, c.text, c.answers, this.data.indexOf(c) + 1));
    this.countdown();
  }

  setTimeleft() {
    if (!this.timeleft) {
      this.timeleft = this.data.length * TimeToProcess;
      localStorage.setItem(timeLeftKey, this.timeleft.toString());
    }
  }

  removeTemp() {
    localStorage.removeItem(timeLeftKey);
    localStorage.removeItem(questionKey);
  }
}
