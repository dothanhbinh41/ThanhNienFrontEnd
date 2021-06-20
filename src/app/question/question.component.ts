import { ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { AnswerDto, QuestionDto, SubmitAnswersRequestDto } from '@proxy/questions/dtos';
import { QuestionModel } from './question.model';

export const questionKey = 'question';
export const timeLeftKey = 'timeLeft';
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
  data: QuestionModel[];
  studentValue: IStudent;
  totalTime = 0;
  timeLeft: number;
  started: boolean;
  loading = false;
  intervalId;
  constructor(
    private questionService: QuestionService,
    private toaster: ToasterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.studentValue = JSON.parse(localStorage.getItem(studentKey));
    this.data = JSON.parse(localStorage.getItem(questionKey));
    this.totalTime = 30 * TimeToProcess;
    this.timeLeft = JSON.parse(localStorage.getItem(timeLeftKey));

    if (this.timeLeft && this.timeLeft < this.totalTime) {
      this.onStart();
    }
  }

  countdown() {
    this.intervalId = setInterval(() => {
      this.timeLeft -= 1;
      localStorage.setItem(timeLeftKey, this.timeLeft.toString());
      if (this.timeLeft <= 0) {
        this.onSave();
      }
    }, 1000);
  }

  async onSave() {
    clearInterval(this.intervalId);
    const finished = this.questions.filter(d => d.answer != null);
    if (finished.length === 0) {
      this.toaster.error('Bạn cần trả lời ít nhất 1 câu hỏi', 'Lỗi');
      return;
    }
    this.loading = true;
    let request: SubmitAnswersRequestDto;
    request = {
      ...this.studentValue,
      phone: String(this.studentValue.phone),
      answers: finished.map(d => ({ questionId: d.id, answerId: d.answer })),
    };

    const result = await this.questionService
      .submitAnswers(request)
      .toPromise()
      .then(data => {
        return data;
      })
      .catch(() => {
        this.loading = false;
      });

    if (result) {
      this.removeTemp();
      this.toaster.success('Nộp bài thành công!!!', 'Thành công');
      this.router.navigateByUrl('/result');
    } else {
      this.toaster.error('Không nộp được bài', 'Lỗi');
    }
    this.loading = false;
  }

  onStart() {
    if (!this.data) {
      this.loading = true;
      this.questionService.getQuestions(this.studentValue.phone).subscribe(d => {
        var md = d.items.map(
          c => new QuestionModel(c.id, c.text, c.answers, d.items.indexOf(c) + 1, undefined)
        )
        localStorage.setItem(questionKey, JSON.stringify(md));
        this.loading = false;;

        this.start(md);
      });

      return;
    }
    this.start(this.data);
  }

  start(dtos: QuestionModel[]) {
    this.started = true;
    this.setTimeleft(dtos);
    this.questions = dtos;
    this.countdown();
    document.getElementById('content').className = `content background-none`;
  }

  setTimeleft(dtos: QuestionModel[]) {
    if (!this.timeLeft) {
      this.timeLeft = dtos.length * TimeToProcess;
      localStorage.setItem(timeLeftKey, this.timeLeft.toString());
    }
  }

  removeTemp() {
    localStorage.clear();
  }

  changeAnswer() {
    localStorage.setItem(questionKey, JSON.stringify(this.questions));
  }
}
