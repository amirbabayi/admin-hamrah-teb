import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {UntypedFormBuilder, UntypedFormGroup, Validators,} from '@angular/forms';
import {AuthService} from 'src/app/core/service/auth.service';
import {UnsubscribeOnDestroyAdapter} from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {MessageService} from "primeng/api";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss'],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;

  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private messageService: MessageService
  ) {
    super();
    if (localStorage.getItem('currentUser')) {
      this.router.navigate(['/apps/duties']);
      return;
    }
  }

  get f() {
    return this.authForm.controls;
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {
      this.subs.sink = this.authService
        .login(this.f['username'].value, this.f['password'].value)
        .subscribe({
          next: (res: any) => {
            if (res.Id) {
              const token = this.authService.currentUserValue?.token;
              if (token) {
                this.router.navigate(['/apps']);
              }
            } else {
              this.messageService.add({severity: 'error', detail: res.message});
              this.loading = false;
            }
          },
          error: (error) => {
            this.messageService.add({severity: 'error', detail: error.message});
            this.submitted = false;
            this.loading = false;
          },
        });
    }
  }
}
