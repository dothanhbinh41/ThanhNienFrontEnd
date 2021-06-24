import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DepartmentService } from '@proxy/departments';
import { DepartmentDto } from '@proxy/departments/dtos';
import { QuestionService } from '@proxy/questions';
import { RESULT_PATH, START_PATH, TEST_PATH } from '../app-routing.module';
import { resultKey, studentKey } from '../question/question.component';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  studentForm: FormGroup;
  loading = false;
  departments: DepartmentDto[] = [];
  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private questionService: QuestionService,
    private departmentService: DepartmentService
  ) { }

  async ngOnInit() {
    localStorage.clear();
    this.studentForm = this.formBuilder.group({
      name: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      classroom: ['', [Validators.required]],
      departmentId: ['', [Validators.required, Validators.min(1)]]
    });
    this.departmentService.getAllDepartment().subscribe(d => { this.departments = d.items });
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

    const result = await this.questionService.getResult(formValue.phone).toPromise();
    if (result) {
      this.loading = false;
      localStorage.setItem(resultKey, JSON.stringify(result));
      this.router.navigate([RESULT_PATH]);
    } else {
      this.loading = false;
      this.router.navigate([START_PATH]);
    }
  }
}
