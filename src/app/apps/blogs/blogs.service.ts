import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {Blog} from './blog.model';
import {HttpClient, HttpErrorResponse} from '@angular/common/http';
import {UnsubscribeOnDestroyAdapter} from '../../shared/UnsubscribeOnDestroyAdapter';
import {environment} from 'src/environments/environment';
import {CfResultList} from '../../core/models/cfResultList';
import {CfResult} from '../../core/models/cfResult';

@Injectable()
export class BlogService extends UnsubscribeOnDestroyAdapter {
  isTblLoading = true;
  dataChange: BehaviorSubject<Blog[]> = new BehaviorSubject<Blog[]>([]);
  public dataSizeChange: BehaviorSubject<number> = new BehaviorSubject<number>(0);
  // Temporarily stores data from dialogs
  dialogData!: Blog;
  private readonly API_URL = `${environment.apiUrl}/blog`;

  constructor(private httpClient: HttpClient) {
    super();
  }

  get data(): Blog[] {
    return this.dataChange.value;
  }

  getDialogData() {
    return this.dialogData;
  }

  /** CRUD METHODS */
  getAllDuties(): void {
    this.subs.sink = this.httpClient
      .get<CfResultList<Blog>>(`${this.API_URL}/GetAll`)
      .subscribe({
        next: (data) => {
          this.isTblLoading = false;
          this.dataChange.next(data.data);
        },
        error: (error: HttpErrorResponse) => {
          this.isTblLoading = false;
          console.log(error.name + ' ' + error.message);
        },
      });
  }

  getPagedBlogs(start: number, length: number): void {
    this.subs.sink = this.httpClient
      .get<CfResultList<Blog>>(`${this.API_URL}/GetAll?start=${start}&length=${length}`)
      .subscribe({
        next: (data: CfResultList<Blog>) => {
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

  addBlog(blog: Blog): Observable<CfResult<Blog>> {
    return this.httpClient.post<CfResult<Blog>>(`${this.API_URL}/Create`, blog);
  }

  updateBlog(blog: Blog): Observable<CfResult<Blog>> {
    return this.httpClient.post<CfResult<Blog>>(`${this.API_URL}/Update`, blog);
  }

  deleteBlog(id: number): Observable<CfResult<Blog>> {
    return this.httpClient.post<CfResult<Blog>>(`${this.API_URL}/Delete/${id}`, {});
  }

  uploadCover(file): Observable<any> {
    return this.httpClient.post(`${environment.baseUrl}/home/UploadFile?prefix=blog-cover`, file);
  }
}
