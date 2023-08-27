import {Component} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {ConfirmationService, MessageService} from "primeng/api";
import {ServiceService} from "../../core/service/service.service";
import {ServiceDataInterface} from "../../core/models/service-data.interface";
import {ServiceBodyInterface} from "../../core/models/service-body.interface";
import {EmployeeType} from "../../core/models/enum/employee-type";
import {RoleBodyInterface} from "../../core/models/role-body.interface";
import {EmployeeService} from "../../core/service/employee.service";

@Component({
  selector: 'app-services',
  templateUrl: './services.component.html',
  styleUrls: ['./services.component.scss']
})
export class ServicesComponent {
  service!: ServiceDataInterface;
  showModal = false;
  phoneNumber!: string;
  isValid = false;
  foundedService: any[] = [];
  searched = false;
  myForm!: FormGroup;
  editMode = false;
  totalCount!: number | any;
  pageSize = 8;
  employeeEnum;
  employeeType!: RoleBodyInterface[];
  filter = {
    start: 0,
    length: this.pageSize
  }
  isSubmitting = false;

  constructor(private serviceService: ServiceService,
              private fb: FormBuilder,
              private messageService: MessageService,
              private confirmationService: ConfirmationService,
              private employeeService: EmployeeService
  ) {
  }

  ngOnInit() {
    this.employeeEnum = EmployeeType;

    this.myForm = this.fb.group({
      Id: null,
      Name: [null, Validators.required],
      BasePrice: [null, Validators.required],
      SecondPrice: [null, Validators.required],
      PrePayment: [null, Validators.required],
      EmployeeType: [null, Validators.required],
      EmployeeName: [null, Validators.required],
      Percent: [30, Validators.required],
      Description: [null],
    });

    this.serviceService.get(this.filter).subscribe((res: any) => {
      this.service = res;
      this.totalCount = this.service?.recordsTotal;
    });

    this.employeeService.getEmployeeType().subscribe(res => {
      this.employeeType = res.extra;
      this.employeeType.forEach(item => item.Value = EmployeeType[item.Key]);
    });

    document.addEventListener('keydown', (event) => {
      if (event.ctrlKey && (event.key === 'f' || event.key === 'ب')) {
        event.preventDefault();
        this.showModal = true;
      }
    });
  }

  edit(customer: ServiceBodyInterface) {
    this.showModal = true;
    this.foundedService.push(customer);
    this.replaceData();
  }

  replaceData() {
    this.editMode = true;
    this.myForm.get('Id')?.setValue(this.foundedService[0].Id);
    this.myForm.get('Name')?.setValue(this.foundedService[0].Name);
    this.myForm.get('BasePrice')?.setValue(this.foundedService[0].BasePrice);
    this.myForm.get('SecondPrice')?.setValue(this.foundedService[0].SecondPrice);
    this.myForm.get('PrePayment')?.setValue(this.foundedService[0].PrePayment);
    this.myForm.get('EmployeeType')?.setValue(this.foundedService[0].EmployeeType);
    this.myForm.get('EmployeeName')?.setValue(this.foundedService[0].EmployeeType);
    this.myForm.get('Percent')?.setValue(this.foundedService[0].Percent);
    this.myForm.get('Description')?.setValue(this.foundedService[0].Description);
  }

  closeModal() {
    this.showModal = false;
    this.foundedService = [];
    this.phoneNumber = '';
    this.searched = false;
    this.editMode = false;
    this.myForm.reset();
  }

  addUser() {
    this.myForm.get('EmployeeType')?.setValue(this.myForm.get('EmployeeName')?.value);
    if (this.myForm.invalid) {
      this.messageService.add({severity: 'warn', detail: 'لطفا اطلاعات خود را به شکل کامل پر کنید!'});
      return;
    }

    this.isSubmitting = true;
    if (this.editMode) {
      this.serviceService.update(this.myForm.value).subscribe((res: any) => {
        this.isSubmitting = false;
        this.messageService.add({severity: 'success', detail: res.message});
        this.service.data.map((item, index) => {
          if (item.Id === this.foundedService[0].Id) {
            this.service.data[index] = this.myForm.value;
          }
        });
        this.showModal = false;
      }, res => {
        this.messageService.add({severity: 'error', detail: res.message});
        this.isSubmitting = false;
      });
      return;
    }


    this.myForm.removeControl('Id');
    this.serviceService.add(this.myForm.value).subscribe((res: any) => {
      this.isSubmitting = false;
      this.messageService.add({severity: 'success', detail: res.message});
      this.service.data.push(this.myForm.value);
      this.showModal = false;
      this.myForm.addControl('Id', new FormControl(null));
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
        this.serviceService.delete(customerId).subscribe((res: any) => {
          this.messageService.add({severity: 'success', detail: res.message});
          this.service.data.splice(this.service.data.findIndex(item => item.Id === customerId), 1);
        });
      }
    });
  }

  onPageChange(event) {
    this.filter['start'] = event.page * this.pageSize;
    this.serviceService.get(this.filter).subscribe((res: any) => {
      this.service = res;
    });
  }

  isSearching(event) {
    this.filter[event.queryString] = event.text;
    this.serviceService.get(this.filter).subscribe((res: any) => {
      this.service = res;
      this.totalCount = this.service?.recordsTotal;
    });
  }
}
