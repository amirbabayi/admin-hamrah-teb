import {Injectable} from '@angular/core';
import {BehaviorSubject, combineLatest, Observable} from 'rxjs';
import {ROUTES} from './sidebar-items';
import {AuthService} from "../../core/service/auth.service";

const emptyMenuConfig = {
  items: []
};

@Injectable({
  providedIn: 'root'
})
export class MenuSidebarService {
  private menuConfigSubject = new BehaviorSubject<any>(emptyMenuConfig);
  menuConfig$: Observable<any>;

  constructor(private authService: AuthService) {
    this.menuConfig$ = this.menuConfigSubject.asObservable();
    this.loadMenu();
  }

  private loadMenu() {
    let result: any = [];
    combineLatest([this.authService.currentUser]).subscribe(user => {
      if (user[0]) {
        result = this.getPermittedMenues(user[0]);
      } else {
        result = this.getAnonymousMenues();
      }

      this.setMenu(result);
    });
  }

  getAnonymousMenues(): any[] {
    const result: any[] = [];
    ROUTES.forEach(x => {
      if (!x['roles'] || (x['roles'] && x['roles'].indexOf('anonymous') > -1)) {
        result.push(x);
      }
    })
    return result;
  }

  getPermittedMenues(user: any) {
    const result: any[] = [];

    ROUTES.forEach(x => {
      if (!x['roles']) {
        result.push(JSON.parse(JSON.stringify(x)));
      } else {
        const roles = x['roles'].split(',');
        const filteredArray = roles.filter(function (n) {
          return user.Roles?.indexOf(n) !== -1;
        });
        if (filteredArray.length) {
          result.push(JSON.parse(JSON.stringify(x)));
        }
      }
    });

    let finalResult = result.slice();

    result.forEach(x => {
      if (x['notInRoles']) {
        const roles = x['notInRoles'].split(',');
        const filteredArray = roles.filter(function (n: string) {
          return user.roles.indexOf(n) !== -1;
        });
        if (filteredArray.length) {
          finalResult = finalResult.filter(z => z.title !== x.title);
        }
      }
    });

    return finalResult;
  }

  private setMenu(menuConfig: { items: any[]; }) {
    this.menuConfigSubject.next(menuConfig);
  }

}
