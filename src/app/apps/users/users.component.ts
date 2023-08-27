import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {UserService} from "../../core/service/user.service";
import {UserInterface} from "../../core/models/user.interface";
import {RoleBodyInterface} from "../../core/models/role-body.interface";
import {AuthService} from "../../core/service/auth.service";

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent implements OnInit {
  users!: UserInterface[];
  showModal = false;
  showModalForChangePassword = false;
  foundedUser: UserInterface[] = [];
  searched = false;
  myForm!: FormGroup;
  changePasswordForm!: FormGroup;
  editMode = false;
  totalCount!: number;
  pageSize = 8;
  roles!: RoleBodyInterface[];
  filter = {
    start: 0,
    length: this.pageSize
  }
  isSubmitting = false;

  constructor(private userService: UserService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private authService: AuthService
  ) {
  }

  ngOnInit() {
    this.myForm = this.fb.group({
      id: null,
      username: ["", Validators.required],
      password: ["", Validators.required],
      roles: [null, Validators.required],
    });

    this.changePasswordForm = this.fb.group({
      id: ["", Validators.required],
      password: ["", Validators.required],
    });

    this.userService.get(this.filter).subscribe((res) => {
      this.users = res.data;
      this.totalCount = res.recordsTotal;
    });

    this.userService.getRoles().subscribe(res => {
      this.roles = res.extra;
    });
  }

  addUser() {
    const myArray = this.myForm.get('roles')?.value;
    this.myForm.get('roles')?.setValue(myArray?.join(", "));

    if (this.myForm.invalid) {
      this.messageService.add({severity: 'warn', detail: 'لطفا اطلاعات خود را به شکل کامل پر کنید!'});
      return;
    }

    this.isSubmitting = true;
    if (this.editMode) {
      this.userService.update(this.myForm.value).subscribe(res => {
        this.isSubmitting = false;
        this.messageService.add({severity: 'success', detail: res.message});
        const index: number = this.users.findIndex(item => item.Id === this.foundedUser[0].Id);
        this.users[index].Username = this.myForm.get('username')?.value;
        this.users[index].Password = this.myForm.get('password')?.value;
        this.users[index].Roles = this.myForm.get('roles')?.value;
        this.showModal = false;
      }, res => {
        this.messageService.add({severity: 'error', detail: res.message});
        this.isSubmitting = false;
      });
      return;
    }

    this.myForm.removeControl('id');
    this.userService.add(this.myForm.value).subscribe(res => {
      this.isSubmitting = false;
      this.messageService.add({severity: 'success', detail: res.message});
      if (res.extra) this.users.push(res.extra);
      this.showModal = false;
      this.myForm.addControl('id', new FormControl(null));
    }, res => {
      this.messageService.add({severity: 'error', detail: res.message});
      this.isSubmitting = false;
    });
  }

  confirm(event: Event | any, customerId: number) {
    this.confirmationService.confirm({
      target: event.target,
      message: 'آیا مطمئن به انجام این کار هستید؟',
      acceptLabel: 'بله',
      rejectLabel: 'خیر',
      accept: () => {
        this.userService.delete(customerId).subscribe(res => {
          this.messageService.add({severity: 'success', detail: res.message});
          this.users.splice(this.users.findIndex(item => item.Id === customerId), 1);
        });
      }
    });
  }

  onPageChange(event) {
    this.filter['start'] = event.page * this.pageSize;
    this.userService.get(this.filter).subscribe((res) => {
      this.users = res.data;
    });
  }

  isSearching(event) {
    this.filter[event.queryString] = event.text;
    this.userService.get(this.filter).subscribe((res) => {
      this.users = res?.data;
      this.totalCount = res?.recordsTotal;
    });
  }

  closeModal() {
    this.showModal = false;
    this.foundedUser = [];
    this.searched = false;
    this.editMode = false;
    this.myForm.reset();
    this.myForm.addControl('password', new FormControl('', Validators.required));
  }

  edit(customer: UserInterface) {
    this.myForm.removeControl('password');
    this.showModal = true;
    this.foundedUser.push(customer);
    this.replaceData();
  }

  replaceData() {
    this.editMode = true;
    this.myForm.get('id')?.setValue(this.foundedUser[0].Id);
    this.myForm.get('username')?.setValue(this.foundedUser[0].Username);
    this.myForm.get('password')?.setValue(this.foundedUser[0].Password);
    this.myForm.get('roles')?.setValue(this.foundedUser[0].Roles.split(", "));
  }

  changePassword(customer: UserInterface) {
    this.showModalForChangePassword = true;
    this.changePasswordForm.get('id')?.setValue(customer.Id);
  }

  changePasswordFunc() {
    if (this.changePasswordForm.invalid) {
      return this.messageService.add({severity: 'error', detail: 'اطلاعات رو به شکل کامل پر کنید!'});
    }

    this.isSubmitting = true;
    this.authService.resetPassword(this.changePasswordForm.value).subscribe((res: any) => {
      this.isSubmitting = false;
      this.showModalForChangePassword = false;
      return this.messageService.add({severity: 'success', detail: res.message});
    }, res => {
      this.messageService.add({severity: 'error', detail: res.message});
      this.isSubmitting = false;
    });
  }
}
