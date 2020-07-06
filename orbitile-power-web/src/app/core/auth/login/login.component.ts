import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {first} from 'rxjs/operators';
import {AuthenticationService} from '../authentication.service';
import {MessageService} from '../../messages/message.service';
import {LoadingService} from '../../../shared/overlay/loading.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;
  submitted = false;
  returnUrl: string;

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authenticationService: AuthenticationService,
    private messageService: MessageService,
    private loadingService: LoadingService
  ) {
    // redirect to home if already logged in
    if (this.authenticationService.currentUserValue) {
      this.route.data.subscribe(data => {
          if (data.logout) {
            this.authenticationService.logout();
          } else {
            router.navigate(['/']);
          }
        }
      );
    }
  }

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';
    this.route
      .data
      .subscribe(v => console.log(v));
  }

  // convenience getter for easy access to form fields
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    }
    this.startLoading();
    this.loading = true;
    this.authenticationService.login(this.f.username.value, this.f.password.value)
      .pipe(first())
      .subscribe(
        data => {
          this.stopLoading();
          this.router.navigate([this.returnUrl]);
          const user = this.authenticationService.currentUserValue;
          this.messageService.sendInfo(`Witaj ${user.firstName} ${user.lastName}`);
        },
        error => {
          this.f.username.setErrors({incorrect: true});
          // this.messageService.sendError(error);
          this.stopLoading();
        });
  }

  private startLoading() {
    this.loading = true;
    this.loadingService.open();
  }

  private stopLoading() {
    this.loading = false;
    this.loadingService.close();
  }
}
