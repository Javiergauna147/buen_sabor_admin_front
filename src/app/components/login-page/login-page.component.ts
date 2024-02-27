import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { UsuarioResponse } from 'src/app/services/auth/auth.interface';
import { Router } from '@angular/router';


@Component({
  standalone: true,
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss'],
  imports: [
    CommonModule,
    ButtonModule,
    InputTextModule,
    CardModule,
    ReactiveFormsModule
  ],
})
export class LoginPageComponent {

  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  })

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  submitform(){
    let userPayload = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    }

    this.authService.login(userPayload).subscribe({
      next: (res: any) => {
        this.authService.guardarToken(res.token, res._doc._id!);
        this.router.navigate(['home']);
      },
      error: (e) => {},
      complete: () => {}
    });
  }

  get emailInvalido(): boolean {
    return this.loginForm.controls.email.invalid && this.loginForm.controls.email.touched
  }

  get formularioInvalido(): boolean {
    return this.loginForm.invalid;
  }

}
