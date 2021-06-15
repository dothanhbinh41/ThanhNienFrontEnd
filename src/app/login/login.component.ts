import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  studentForm: FormGroup;
  loading = false;
  constructor(private formBuilder: FormBuilder, private router: Router) {}

  ngOnInit(): void {
    const studentValue = JSON.parse(localStorage.getItem('student'));
    if (studentValue) {
      this.router.navigate(['test']);
    }
    this.studentForm = this.formBuilder.group({
      fullName: ['', [Validators.required]],
      phone: ['', [Validators.required]],
      studentId: ['', [Validators.required]],
      classroom: ['', [Validators.required]],
    });
  }

  onSubmit() {
    if (this.studentForm.invalid) return;
    this.loading = true;

    localStorage.setItem(
      'student',
      JSON.stringify({
        ...this.studentForm.value,
      })
    );

    setTimeout(() => {
      this.loading = false;
      this.router.navigate(['test']);
    }, 300);
  }
}
