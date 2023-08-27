import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {debounceTime, distinctUntilChanged, Subject} from "rxjs";

@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent implements OnInit {
  @Input() data!: any;
  @Input() optionValue!: string;
  @Input() optionLabel!: string;
  @Input() placeholder!: string;
  @Input() queryString!: string;
  selectedItem!: string | number;
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
