import { Component } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { CardModule } from 'primeng/card';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../services/auth/auth.service';
import { catchError, of } from 'rxjs';
import { UsuarioResponse } from 'src/app/services/auth/auth.interface';


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

  constructor(private fb: FormBuilder, private authService: AuthService) {}

  submitform(){
    let userPayload = {
      email: this.loginForm.value.email as string,
      password: this.loginForm.value.password as string
    }

    this.authService.login(userPayload).subscribe({
      next: (res: UsuarioResponse) => {
        console.log("recontra logeado")
        this.authService.guardarToken(res.token);
      },
      error: () => {
        console.log("logeo incorercto")
      },
      complete: () => {
        console.log("finalizada llamada a la api")
      }
    });
  }

  get emailInvalido(): boolean {
    return this.loginForm.controls.email.invalid && this.loginForm.controls.email.touched
  }

  get formularioInvalido(): boolean {
    return this,this.loginForm.invalid;
  }

}
