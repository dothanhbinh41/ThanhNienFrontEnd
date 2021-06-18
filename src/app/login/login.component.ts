import { LazyLoadService, StyleLoadingStrategy } from '@abp/ng.core';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { IStudent, questionKey, studentKey } from '../question/question.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  studentForm: FormGroup;
  studentValue: IStudent;
  loading = false;
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private questionService: QuestionService
  ) {}

  async ngOnInit() {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      classroom: ['', [Validators.required]],
    });
    const studentValue = JSON.parse(localStorage.getItem(studentKey));

    if (studentValue) {
      const result = await this.checkResult(studentValue.phone);
      if (result) {
        this.loading = false;
        this.router.navigate(['result']);
        this.questionService.resultStudent = result;
      } else {
        await this.getQuestion();
        this.loading = false;
        this.router.navigate(['test']);
      }
    }
  }

  async onSubmit() {
    if (this.studentForm.invalid) return;
    this.loading = true;
    const formValue = this.studentForm.value;
    localStorage.setItem(
      studentKey,
      JSON.stringify({
        ...formValue,
      })
    );

    const result = await this.checkResult(formValue.phone);
    if (result) {
      this.loading = false;
      this.router.navigate(['result']);
    } else {
      await this.getQuestion();
      this.loading = false;
      this.router.navigate(['test']);
    }
  }

  async checkResult(phone) {
    return await this.questionService.getResult(phone).toPromise();
  }

  async getQuestion() {
    var questions = await this.questionService.getQuestions().toPromise();
    localStorage.setItem(questionKey, JSON.stringify(questions.items));
  }
}
