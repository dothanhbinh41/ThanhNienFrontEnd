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
  constructor(private formBuilder: FormBuilder, private router: Router, private questionService: QuestionService,private lazyLoadService: LazyLoadService) { }

  ngOnInit(): void {
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      classroom: ['', [Validators.required]],
    });
  }

  async onSubmit() {
    if (this.studentForm.invalid) return;
    
    localStorage.setItem(
      studentKey,
      JSON.stringify({
        ...this.studentForm.value,
      })
    );
 
    var result = await this.checkResult(this.studentForm.get('phone').value);
    if (result) {
      this.loading = false;
      this.router.navigate(['test']);
    }
    else {
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
