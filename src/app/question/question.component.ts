import { ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { AnswerDto, QuestionDto, SubmitAnswersRequestDto } from '@proxy/questions/dtos';
import { LOGIN_PATH, RESULT_PATH } from '../app-routing.module';
import { QuestionModel } from './question.model';

export const questionKey = 'question';
export const timeLeftKey = 'timeLeft';
export const studentKey = 'student';
export const resultKey = 'result';
export const TimeToProcess = 20; //second

export interface IStudent {
  name: string;
  phone: string;
  studentId: string;
  classroom: string;
  departmentId: number;
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
  timeLeft: number;
  started: boolean  = true;
  loading = false;
  intervalId;
  constructor(
    private questionService: QuestionService,
    private toaster: ToasterService,
    private router: Router
  ) { }

  ngOnInit() {
    this.studentValue = JSON.parse(localStorage.getItem(studentKey));
    this.questions = JSON.parse(localStorage.getItem(questionKey)); 
    this.timeLeft = JSON.parse(localStorage.getItem(timeLeftKey)); 
    if(!this.questions){
      this.router.navigate([LOGIN_PATH]);
    } 
    this.setTimeleft();
    this.countdown();
  }

  setTimeleft() {
    if (!this.timeLeft) {
      this.timeLeft = this.questions.length * TimeToProcess;
      localStorage.setItem(timeLeftKey, this.timeLeft.toString());
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
      //this.toaster.error('Bạn cần trả lời ít nhất 1 câu hỏi', 'Lỗi');
      //return;
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
      this.router.navigateByUrl(RESULT_PATH);
    } else {
      this.toaster.error('Không nộp được bài, ban hay dang nhap lai', 'Lỗi');
      this.router.navigateByUrl(LOGIN_PATH);
    }
    this.loading = false;
  }
 


  removeTemp() {
    localStorage.removeItem(questionKey);
    localStorage.removeItem(timeLeftKey);
  }

  changeAnswer() {
    localStorage.setItem(questionKey, JSON.stringify(this.questions));
  }
}
