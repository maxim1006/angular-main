import {Component, OnInit} from "@angular/core";
import {DomSanitizer, SafeHtml} from "@angular/platform-browser";
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from './auth.service';
import {Router} from '@angular/router';

@Component({
    selector: "m-auth",
    styles: [`
        .login-form__field {
            margin-bottom: 20px;
        }
        
        .login-form__field-required {
            margin: 0 10px 0 0;
            color: red;
        }
        
        .login-form__button._submit:disabled {
            opacity: 0.4;
        }
    `],
    template: `

        <div [innerHTML]="html"></div>

        <!--Пример для работы с ]JWT токеном-->
        <form
            class="login-form"
            novalidate
            [formGroup]="loginForm"
            (ngSubmit)="_login()"
        >
            <div class="login-form__field">
                <label for="loginInput">Enter login <sup class="login-form__field-required">*</sup></label>
                <input
                    id="loginInput"
                    type="text"
                    placeholder="Enter your login"
                    formControlName="login"
                />
            </div>
            <div class="login-form__field">
                <label for="loginInput">Enter password <sup class="login-form__field-required">*</sup></label>
                <input
                    id="passwordInput"
                    type="password"
                    autocomplete="new password"
                    placeholder="Enter your password"
                    formControlName="password"
                />
            </div>
            <button class="login-form__button _submit" type="submit" [disabled]="!loginForm.valid">login</button>
        </form>
        
        <button (click)="_getAuthData()">Make request for auth data</button>

    `
})

export class AuthComponent implements OnInit {
    public loginForm: FormGroup;
    private html: SafeHtml;

    constructor(
        private sanitizer: DomSanitizer,
        private fb: FormBuilder,
        private authService: AuthService,
        private router: Router
    ) {
    }

    ngOnInit() {
        this.html = this.sanitizer.bypassSecurityTrustHtml("<h3>bypassSecurityTrustHtml</h3><script>script()</script>");

        this.loginForm = this.fb.group({
            "login": ["", Validators.compose([Validators.required])],
            "password": ["", Validators.compose([Validators.required])],
        });
    }

    _login() {
        console.log("data from login form: ", this.loginForm.value);

        this.authService
            .login(this.loginForm.value)
            .subscribe((data) => {
                console.log("user is logged in ", data);
                // this.router.navigateByUrl('/');
            });
    }

    _getAuthData() {
        this.authService.getAuthData()
            .subscribe((data) => {
                console.log("_getAuthData ", data);
            });
    }
}
