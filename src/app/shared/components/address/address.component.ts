import {Component, EventEmitter, Input, OnDestroy, OnInit, Output} from '@angular/core';
import {Subscription} from "rxjs";
import {CityService} from "../../../core/service/city.service";

@Component({
  selector: 'app-address',
  templateUrl: './address.component.html',
  styleUrls: ['./address.component.scss']
})
export class AddressComponent implements OnInit, OnDestroy {
  cities!: any;
  selectedCity!: any;
  @Input() province!: any;
  selectedProvince!: any;
  @Input() address: string | null = null;
  @Output() getData: EventEmitter<object> = new EventEmitter<object>();
  @Input() selectedCityId: number | null = null;
  @Input() selectedProvinceId: number | null = null;
  subscription = new Subscription();

  constructor(private cityService: CityService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.subscription.add(
      this.cityService.obsCities.subscribe(res => {
        this.cities = res;
        if (this.cities) {
          this.selectedCity = this.selectedCityId ? this.cities?.find(item => item?.Id === this.selectedCityId) : null;
        }
      })
    );

    this.selectedProvince = this.selectedProvinceId ? this.province.find(item => item?.Id === this.selectedProvinceId) : null;
  }


  sendData(event: any, formController: string) {
    this.getData.emit({data: event.value?.Id ?? event, formController: formController});
  }
}
