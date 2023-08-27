import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {map} from 'rxjs/operators';
import {User} from '../models/user';
import {CfResult} from '../models/cfResult';
import {environment} from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private currentUserSubject: BehaviorSubject<User | any>;
  public currentUser: Observable<User>;

  constructor(private http: HttpClient) {
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(<string>localStorage.getItem('currentUser')) ?? '');
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  isAdmin() {
    return this.currentUserValue.Roles === 'Admin';
  }

  isUser() {
    return this.currentUserValue.Roles === 'User';
  }

  isCustomer() {
    return this.currentUserValue.Roles === 'Customer';
  }

  login(username: string, password: string) {
    return this.http
      .post<CfResult<User>>(`${environment.apiUrl}/auth/login`, {
        username,
        password,
      })
      .pipe(
        map((result) => {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          if (result.status == 0) {
            result.extra.token = result.message;
            localStorage.setItem('currentUser', JSON.stringify(result.extra as User));
            this.currentUserSubject.next(result.extra);
            return result.extra;
          } else {
            return result;
          }
        })
      );
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
    return of({success: false});
  }

  resetPassword(value: object) {
    return this.http.post(`${environment.apiUrl}/Auth/ResetPassword`, value);
  }
}
