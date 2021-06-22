import { ConfirmationService, ToasterService } from '@abp/ng.theme.shared';
import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { AnswerDto, QuestionDto, SubmitAnswersRequestDto } from '@proxy/questions/dtos';
import { LOGIN_PATH, TEST_PATH } from '../app-routing.module';
import { QuestionModel } from '../question/question.model';

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
  selector: 'app-start',
  templateUrl: './start.component.html',
  styleUrls: ['./start.component.scss'],
})
export class StartComponent implements OnInit {
  @ViewChild('dialogRef') dialogRef: TemplateRef<MatDialog>;
  studentValue: IStudent;
  loading = false;
  constructor(
    private questionService: QuestionService,
    private toaster: ToasterService,
    private router: Router,
    public dialog: MatDialog
  ) {}

  ngOnInit() {
    this.studentValue = JSON.parse(localStorage.getItem(studentKey));
    if (!this.studentValue) {
      this.router.navigateByUrl(LOGIN_PATH);
      return;
    }
  }

  ngAfterViewInit() {
    if (window.screen.width <= 768) {
      this.dialog.open(this.dialogRef, {
        hasBackdrop: false,
        width: '100%',
        height: '100%',
        panelClass: 'custom-dialog',
      });
    }
  }

  onStart() {
    var data = JSON.parse(localStorage.getItem(questionKey));
    if (data) {
      this.router.navigateByUrl(TEST_PATH);
      return;
    }

    this.loading = true;
    this.questionService.getQuestions(this.studentValue.phone).subscribe(
      next => {
        var md = next.items.map(
          c => new QuestionModel(c.id, c.text, c.answers, next.items.indexOf(c) + 1, undefined)
        );
        localStorage.setItem(questionKey, JSON.stringify(md));
        localStorage.setItem(timeLeftKey, (TimeToProcess * md.length).toString());
        this.router.navigateByUrl(TEST_PATH);
      },
      error => {
        this.toaster.error(error, 'Loi');
      },
      () => {
        this.loading = false;
      }
    );
  }
}
