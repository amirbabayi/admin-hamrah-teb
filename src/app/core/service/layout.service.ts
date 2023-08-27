import {Injectable} from '@angular/core';
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class LayoutService {
  menuSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  toggleMenu() {
    this.menuSubject.next(true);
  }
}
