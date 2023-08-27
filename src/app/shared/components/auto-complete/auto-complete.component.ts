import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.scss']
})
export class AutoCompleteComponent {
  @Input() placeholder!: string;
  @Input() queryString!: string;
  @Input() field!: string;
  @Input() dataSuggest: any[] = [];
  data: any[] = [];
  text!: string;
  @Output() item: EventEmitter<object> = new EventEmitter<object>();

  constructor() {
    this.data = this.dataSuggest;
  }

  searching(event: any) {
    this.data = this.dataSuggest.filter(item => item.FullName.includes(event.query));
  }

  clearSearch(){
    this.item.emit({text: null, queryString: this.queryString});
  }

  itemSelected(event) {
    this.item.emit({text: event.Id, queryString: this.queryString});
  }
}
