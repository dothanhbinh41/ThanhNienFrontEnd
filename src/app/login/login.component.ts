import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { QuestionService } from '@proxy/questions';
import { studentKey } from '../question/question.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  studentForm: FormGroup; 
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

    const result = await  this.questionService.getResult(formValue.phone).toPromise();
    if (result) {
      this.loading = false;
      this.router.navigate(['result']);
    } else { 
      this.loading = false;
      this.router.navigate(['test']);
    }
  } 
}
