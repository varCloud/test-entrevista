import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PERMITS } from 'src/app/constants/constants';
import { LocalStorageService } from 'src/app/services/local-storage/local-storage.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private readonly USER = "test"
  private readonly PASS = "test"
  private readonly ADMIN_USER = "testAdmin"
  private readonly ADMIN_PASS = "testAdmin"
  private readonly URL_HOME = ""
  public isSumbit = false
  public hasError = false
  public loginForm: FormGroup = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(4)]),
    password: new FormControl('', [Validators.required, Validators.minLength(4)])
  });

  constructor(private _router: Router,
    private _localStorageService: LocalStorageService
  ) { }

  ngOnInit(): void {
  }

  public onSumbit(): void {
    if (this.loginForm.valid) {
      this.isSumbit = true;
      setTimeout(()=>{
        if (
          (this.USER === this.loginForm.get('user')?.value && this.PASS === this.loginForm.get(`password`)?.value) ||
           this.ADMIN_USER === this.loginForm.get('user')?.value && this.ADMIN_PASS === this.loginForm.get(`password`)?.value ) {
          this.isSumbit = false;
          const user : string = this.loginForm.get('user')?.value ?? this.USER
          this._router.navigate(['/routes'])
          this._localStorageService.setItem(`isActive`, true)
          this._localStorageService.setItem(`userSesion`,this.loginForm.getRawValue())
          this._localStorageService.setItem(`permits`,PERMITS[user])
        }else{
          this.isSumbit = false;
          this.hasError = true;
          setTimeout(()=>{this.hasError = false},5000)
        }
      },1000)
    }
  }
}
