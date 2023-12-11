import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss'],
})
export class RegistrationComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private authSrv: AuthService,
    private router: Router,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      name: this.fb.control(null, [Validators.required]),
      surname: this.fb.control(null, [Validators.required]),
      username: this.fb.control(null, [Validators.required]),
      email: this.fb.control(null, [Validators.required, Validators.email]),
      password: this.fb.control(null, [
        Validators.required,
        Validators.maxLength(8),
      ]),
      imageProf: this.fb.control(null, [Validators.required]),
      city: this.fb.control(null, [Validators.required]),
      phone: this.fb.control(null, [Validators.required]),
    });
  }

  geterrorsC(name: string, error: string) {
    return this.form.get(name)?.errors![error];
  }

  getFormC(nome: string) {
    return this.form.get(nome);
  }

  signUp() {
    console.log(this.form.value);
    try {
      this.authSrv.register(this.form.value).subscribe();
      this.router.navigate(['/login']);
    } catch (error: any) {
      console.log(error);
      alert('Email già registrata');
      this.router.navigate(['/register']);
    }
  }
}
