import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { filter } from 'rxjs/operators';
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
  allProvinces: any[] = [];
  showDropdown = false;

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
    this.loadLocationFromLocalStorage();
  }

  loadLocationFromLocalStorage() {
    const savedData = localStorage.getItem('savedLocation');
    if (savedData) {
      this.savedLocation = JSON.parse(savedData);
    }
  }

  loadProvinces() {
    this.locationService.getProvinces()
    .pipe(filter((data: any[]) => Array.isArray(data) && data.length > 0))
    .subscribe((data: any) => {
      this.provinces = data;
      this.allProvinces = data;
    });
  }

  onProvinceChange() {
    const province = this.locationForm.value.province;
    
    // Check if input matches an exact province
    const exactMatch = this.allProvinces.some(p => 
      p.province.toLowerCase() === province.toLowerCase()
    );

    // Filter provinces based on input
    const search = province ? province.toLowerCase() : '';
    if (search) {
      this.provinces = this.allProvinces.filter(p =>
        p.province.toLowerCase().includes(search)
      );
      this.showDropdown = !exactMatch && this.provinces.length > 0;
    } else {
      this.provinces = this.allProvinces;
      this.showDropdown = false;
    }

    this.townCities = [];
    this.barangays = [];
    this.locationForm.patchValue({ townCity: '', barangay: '' });

    const barangayControl = this.locationForm.get('barangay');
    if (barangayControl) {
      barangayControl.disable();
    }

    const townCityControl = this.locationForm.get('townCity');
    if (!province || !exactMatch) {
      if (townCityControl) {
        townCityControl.disable();
      }
      return;
    }

    this.locationService.getTownsCities(province)
    .pipe(filter((data: any[]) => Array.isArray(data)))
    .subscribe((data: any) => {
      this.townCities = data;
      if (townCityControl) {
        townCityControl.enable();
      }
    });
  }

  selectProvince(province: any) {
    const provinceValue = province.province || province.name || province;
    this.locationForm.patchValue({ province: provinceValue });
    this.showDropdown = false;
    this.onProvinceChange();
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

    this.locationService.getBarangays(province, townCity)
    .pipe(filter((data: any[]) => Array.isArray(data)))
    .subscribe((data: any) => {
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
      localStorage.setItem('savedLocation', JSON.stringify(response));
    }, error => {
      console.error('Error saving location', error);
    });
  }
  
}