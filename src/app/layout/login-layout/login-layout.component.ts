import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import { Router } from '@angular/router';
import { LoginService } from './login.service';
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-login-layout',
  templateUrl: './login-layout.component.html',
  styleUrls: ['./login-layout.component.css']
})
export class LoginLayoutComponent implements OnInit {
  hide = true;
  emailFormControl = new FormControl('', [
    Validators.required,
  ]);

  matcher = new MyErrorStateMatcher();
  loginId: string;
  password: string;
  credentials: any = [];
  constructor(private loginService: LoginService, private router: Router) { }

  ngOnInit(): void {
    this.loginService.getCredentials().subscribe(res => {

      this.credentials = res


    })
  }
  onClickOfLogIn() {

    if (this.credentials.loginId === this.loginId && this.credentials.password === this.password) {
      sessionStorage.setItem('loginFlag', 'true')
      this.router.navigate(["/Dashboard"])
    }
    else {
      console.log('check credentials');

    }

  }

}
