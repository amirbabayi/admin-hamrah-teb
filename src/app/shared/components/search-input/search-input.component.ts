import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-search-input',
  templateUrl: './search-input.component.html',
  styleUrls: ['./search-input.component.scss']
})
export class SearchInputComponent implements OnInit {
  @Input() placeholder!: string;
  @Input() queryString!: string;
  @Input() type = 'text';
  text!: string;
  isSearching: Subject<string> = new Subject<string>();
  @Output() isSearchingFunc: EventEmitter<object> = new EventEmitter<object>();

  searching(event: string) {
    this.isSearching.next(event);
  }

  ngOnInit(): void {
    this.isSearching.pipe(debounceTime(500), distinctUntilChanged()).subscribe(res => {
      this.isSearchingFunc.emit({text: res, queryString: this.queryString});
    })
  }
}
