import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Duty} from './duty.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from '../../shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';
import {CfResultList} from '../../core/models/cfResultList';
import {CfResult} from '../../core/models/cfResult';

@Injectable()
export class DutyService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Duty[]> = new BehaviorSubject<Duty[]>([]);
  public dataSizeChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // Temporarily stores data from dialogs
  dialogData!: Duty;
  private readonly API_URL = `${environment.apiUrl}/duty`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Duty[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDuties(): void {
    this.subs.sink = this.httpClient
      .get<CfResultList<Duty>>(`${this.API_URL}/GetAll`)
      .subscribe({
        next: (data: CfResultList<Duty>) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.dataSizeChange.next(data.recordsFiltered)
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getPagedDuties(start: number, length: number): void {
    this.subs.sink = this.httpClient
      .get<CfResultList<Duty>>(`${this.API_URL}/GetAll?start=${start}&length=${length}`)
      .subscribe({
        next: (data: CfResultList<Duty>) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
          this.dataSizeChange.next(data.recordsFiltered)
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  addDuty(duty: Duty): Observable<CfResult<Duty>> {
    this.dialogData = duty;

    return this.httpClient.post<CfResult<Duty>>(`${this.API_URL}/Create`, duty);
  }

  updateDuty(duty: Duty): Observable<CfResult<Duty>> {
    this.dialogData = duty;

    return this.httpClient.post<CfResult<Duty>>(`${this.API_URL}/Update`, duty);
  }

  deleteDuty(id: number): Observable<CfResult<Duty>> {
    return this.httpClient.post<CfResult<Duty>>(`${this.API_URL}/Delete/${id}`, {});
  }

  uploadCover(file): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/home/UploadFile?prefix=duty-cover`, file);
  }
}
