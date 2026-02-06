import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocationService } from '../services/location.service';

@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {

  locationForm!: FormGroup;

  provinces: any[] = [];
  townCities: any[] = [];
  barangays: any[] = [];

  savedLocation: any = null;

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService
  ) {}

  ngOnInit() {
    this.locationForm = this.fb.group({
      province: [''],
      townCity: [{ value: '', disabled: true }],
      barangay: [{ value: '', disabled: true }]
    });

    this.loadProvinces();
  }

  loadProvinces() {
    this.locationService.getProvinces().subscribe((data: any) => {
      this.provinces = data;
    });
  }

  onProvinceChange() {
    const province = this.locationForm.value.province;

    this.townCities = [];
    this.barangays = [];
    this.locationForm.patchValue({ townCity: '', barangay: '' });

    const barangayControl = this.locationForm.get('barangay');
    if (barangayControl) {
      barangayControl.disable();
    }

    const townCityControl = this.locationForm.get('townCity');
    if (!province) {
      if (townCityControl) {
        townCityControl.disable();
      }
      return;
    }

    this.locationService.getTownsCities(province).subscribe((data: any) => {
      this.townCities = data;
      if (townCityControl) {
        townCityControl.enable();
      }
    });
  }

  onTownCityChange() {
    const province = this.locationForm.value.province;
    const townCity = this.locationForm.value.townCity;

    this.barangays = [];
    this.locationForm.patchValue({ barangay: '' });

    const barangayControl = this.locationForm.get('barangay');

    if (!province || !townCity) {
      if (barangayControl) {
        barangayControl.disable();
      }
      return;
    }

    this.locationService.getBarangays(province, townCity).subscribe((data: any) => {
      this.barangays = data;
      if (barangayControl) {
        barangayControl.enable();
      }
    });
  }
  
  saveLocation()
  {
    const payload = 
    {
      province : this.locationForm.value.province,
      townCity : this.locationForm.value.townCity,
      barangay : this.locationForm.value.barangay
    };

    this.locationService.saveLocation(payload).subscribe(response => {
      console.log('Location saved successfully', response);

      this.savedLocation = response;
    }, error => {
      console.error('Error saving location', error);
    });
  }
  
}