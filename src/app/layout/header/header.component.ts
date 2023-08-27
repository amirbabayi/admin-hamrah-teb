import {DOCUMENT} from '@angular/common';
import {AfterViewInit, Component, ElementRef, Inject, OnInit, Renderer2,} from '@angular/core';
import {Router} from '@angular/router';
import {ConfigService} from 'src/app/config/config.service';
import {InConfiguration} from 'src/app/core/models/config.interface';
import {User} from 'src/app/core/models/user';
import {AuthService} from 'src/app/core/service/auth.service';
import {LanguageService} from 'src/app/core/service/language.service';
import {UnsubscribeOnDestroyAdapter} from 'src/app/shared/UnsubscribeOnDestroyAdapter';
import {ConfirmationService, MessageService} from "primeng/api";
import {LayoutService} from "../../core/service/layout.service";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

interface Notifications {
  message: string;
  time: string;
  icon: string;
  color: string;
  status: string;
}

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  providers: [ConfirmationService],
})
export class HeaderComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit, AfterViewInit {
  public config!: InConfiguration;
  userImg?: string;
  homePage?: string;
  flagvalue: string | string[] | undefined;
  countryName: string | string[] = [];
  langStoreValue?: string;
  defaultFlag?: string;
  docElement: HTMLElement | undefined;
  isFullScreen = false;
  user: User;
  isOpen = false;
  showModalForChangePassword = false;
  isSubmitting = false;
  myForm!: FormGroup;

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2,
    public elementRef: ElementRef,
    private configService: ConfigService,
    private authService: AuthService,
    private router: Router,
    private confirmationService: ConfirmationService,
    public languageService: LanguageService,
    private layoutService: LayoutService,
    private messageService: MessageService,
    private fb: FormBuilder
  ) {
    super();
    this.user = JSON.parse(localStorage.getItem('currentUser') ?? '{}') as User;
  }

  listLang = [
    {text: 'فارسی', flag: 'assets/images/flags/persian.jpg', lang: 'fa'},
    {text: 'English', flag: 'assets/images/flags/us.jpg', lang: 'en'},
  ];

  closeModal() {
    this.myForm.get('password')?.setValue('');
    this.myForm.get('confirmPassword')?.setValue('');
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      id: this.user?.Id,
      password: ["", Validators.required],
      confirmPassword: ["", Validators.required],
    });

    this.config = this.configService.configData;
    this.userImg = this.authService.currentUserValue.AvatarUrl;

    this.homePage = 'dashboard/dashboard1';

    this.langStoreValue = localStorage.getItem('lang') as string;
    const val = this.listLang.filter((x) => x.lang === this.langStoreValue);
    this.countryName = val.map((element) => element.text);
    if (val.length === 0) {
      if (this.flagvalue === undefined) {
        this.defaultFlag = 'assets/images/flags/fa.jpg';
      }
    } else {
      this.flagvalue = val.map((element) => element.flag);
    }
  }

  ngAfterViewInit() {
    // set theme on startup
    if (localStorage.getItem('theme')) {
      this.renderer.removeClass(this.document.body, this.config.layout.variant);
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('theme') as string
      );
    } else {
      this.renderer.addClass(this.document.body, this.config.layout.variant);
    }

    if (localStorage.getItem('menuOption')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('menuOption') as string
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'menu_' + this.config.layout.sidebar.backgroundColor
      );
    }

    if (localStorage.getItem('choose_logoheader')) {
      this.renderer.addClass(
        this.document.body,
        localStorage.getItem('choose_logoheader') as string
      );
    } else {
      this.renderer.addClass(
        this.document.body,
        'logo-' + this.config.layout.logo_bg_color
      );
    }

    if (localStorage.getItem('sidebar_status')) {
      if (localStorage.getItem('sidebar_status') === 'close') {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      } else {
        this.renderer.removeClass(this.document.body, 'side-closed');
        this.renderer.removeClass(this.document.body, 'submenu-closed');
      }
    } else {
      if (this.config.layout.sidebar.collapsed === true) {
        this.renderer.addClass(this.document.body, 'side-closed');
        this.renderer.addClass(this.document.body, 'submenu-closed');
      }
    }
  }

  changePasswordFunc() {
    if (this.myForm.invalid) {
      return this.messageService.add({severity: 'error', detail: 'اطلاعات رو به شکل کامل پر کنید!'});
    }

    this.isSubmitting = true;
    this.authService.resetPassword(this.myForm.value).subscribe({
      next: (res: any) => {
        this.isSubmitting = false;
        this.showModalForChangePassword = false;
        return this.messageService.add({severity: 'success', detail: res.message});
      },
      error: res => {
        this.messageService.add({severity: 'error', detail: res.message});
        this.isSubmitting = false;
      }
    });
  }

  setLanguage(text: string, lang: string, flag: string) {
    this.countryName = text;
    this.flagvalue = flag;
    this.langStoreValue = lang;
    this.languageService.setLanguage(lang);
  }

  mobileMenuSidebarOpen(event: Event, className: string) {
    const hasClass = (event.target as HTMLInputElement).classList.contains(
      className
    );
    if (hasClass) {
      this.renderer.removeClass(this.document.body, className);
    } else {
      this.renderer.addClass(this.document.body, className);
    }

    const hasClass2 = this.document.body.classList.contains('side-closed');
    if (hasClass2) {
      // this.renderer.removeClass(this.document.body, "side-closed");
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      // this.renderer.addClass(this.document.body, "side-closed");
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }

  callSidemenuCollapse() {
    const hasClass = this.document.body.classList.contains('side-closed');
    if (hasClass) {
      this.renderer.removeClass(this.document.body, 'side-closed');
      this.renderer.removeClass(this.document.body, 'submenu-closed');
    } else {
      this.renderer.addClass(this.document.body, 'side-closed');
      this.renderer.addClass(this.document.body, 'submenu-closed');
    }
  }

  logout() {
    this.subs.sink = this.authService.logout().subscribe((res) => {
      if (!res.success) {
        this.router.navigate(['/authentication/signin']);
      }
    });
  }

  exit() {
    this.confirmationService.confirm({
      accept: () => {
        this.authService.logout();
        this.router.navigate(['/authentication/signin']);
      },
    });
  }

  toggleMenu() {
    this.layoutService.toggleMenu();
  }
}
