import { Component, ElementRef, HostListener, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { LocationService } from '../services/location.service';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { filter, finalize } from 'rxjs/operators';
@Component({
  selector: 'app-place',
  templateUrl: './place.component.html',
  styleUrls: ['./place.component.css']
})
export class PlaceComponent implements OnInit {
  @ViewChild('provinceSearchContainer', { static: false }) provinceSearchContainer!: ElementRef;
  @ViewChild('townCitySearchContainer', { static: false }) townCitySearchContainer!: ElementRef;
  @ViewChild('barangaySearchContainer', { static: false }) barangaySearchContainer!: ElementRef;

  locationForm!: FormGroup;

  

  provinces: any[] = [];
  townCities: any[] = [];
  barangays: any[] = [];

  savedLocation: any = null;
  allProvinces: any[] = [];
  filteredTownCities: any[] = [];
  filteredBarangays: any[] = [];
  showDropdown = false;
  showTownCityDropdown = false;
  showBarangayDropdown = false;
  isProvincesLoading$ = new BehaviorSubject<boolean>(false);
  isTownCitiesLoading$ = new BehaviorSubject<boolean>(false);
  isBarangaysLoading$ = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder,
    private locationService: LocationService,
    private toastr: ToastrService
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
    this.isProvincesLoading$.next(true);
    this.locationService.getProvinces()
    .pipe(filter((data: any[]) => Array.isArray(data) && data.length > 0))
    .pipe(finalize(() => this.isProvincesLoading$.next(false)))
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
    this.filteredTownCities = [];
    this.showTownCityDropdown = false;
    this.isTownCitiesLoading$.next(false);
    this.barangays = [];
    this.filteredBarangays = [];
    this.showBarangayDropdown = false;
    this.isBarangaysLoading$.next(false);
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

    this.isTownCitiesLoading$.next(true);
    this.locationService.getTownsCities(province)
    .pipe(filter((data: any[]) => Array.isArray(data)))
    .pipe(finalize(() => this.isTownCitiesLoading$.next(false)))
    .subscribe((data: any) => {
      this.townCities = data;
      this.filteredTownCities = data;
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

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent) {
    const target = event.target as Node;
    const clickedInsideProvinceSearch = this.provinceSearchContainer &&
      this.provinceSearchContainer.nativeElement.contains(target);
    const clickedInsideTownCitySearch = this.townCitySearchContainer &&
      this.townCitySearchContainer.nativeElement.contains(target);
    const clickedInsideBarangaySearch = this.barangaySearchContainer &&
      this.barangaySearchContainer.nativeElement.contains(target);

    if (this.showDropdown && !clickedInsideProvinceSearch) {
      this.showDropdown = false;
    }

    if (this.showTownCityDropdown && !clickedInsideTownCitySearch) {
      this.showTownCityDropdown = false;
    }

    if (this.showBarangayDropdown && !clickedInsideBarangaySearch) {
      this.showBarangayDropdown = false;
    }
  }

  onTownCityInputChange() {
    const townCity = this.locationForm.value.townCity;
    const search = townCity ? townCity.toLowerCase() : '';
    const exactMatch = this.townCities.some(t =>
      this.getTownCityName(t).toLowerCase() === search
    );

    if (search) {
      this.filteredTownCities = this.townCities.filter(t =>
        this.getTownCityName(t).toLowerCase().includes(search)
      );
      this.showTownCityDropdown = !exactMatch && this.filteredTownCities.length > 0;
    } else {
      this.filteredTownCities = this.townCities;
      this.showTownCityDropdown = false;
    }

    this.barangays = [];
    this.filteredBarangays = [];
    this.showBarangayDropdown = false;
    this.isBarangaysLoading$.next(false);
    this.locationForm.patchValue({ barangay: '' });

    const barangayControl = this.locationForm.get('barangay');
    if (barangayControl) {
      barangayControl.disable();
    }

    if (!townCity || !exactMatch) {
      return;
    }

    this.onTownCityChange();
  }

  selectTownCity(townCity: any) {
    const townCityValue = this.getTownCityName(townCity);
    this.locationForm.patchValue({ townCity: townCityValue });
    this.showTownCityDropdown = false;
    this.onTownCityChange();
  }

  onTownCityChange() {
    const province = this.locationForm.value.province;
    const townCity = this.locationForm.value.townCity;
    const exactMatch = this.townCities.some(t =>
      this.getTownCityName(t).toLowerCase() === (townCity ? townCity.toLowerCase() : '')
    );

    this.barangays = [];
    this.filteredBarangays = [];
    this.showBarangayDropdown = false;
    this.locationForm.patchValue({ barangay: '' });

    const barangayControl = this.locationForm.get('barangay');

    if (!province || !townCity || !exactMatch) {
      if (barangayControl) {
        barangayControl.disable();
      }
      return;
    }

    this.isBarangaysLoading$.next(true);
    this.locationService.getBarangays(province, townCity)
    .pipe(filter((data: any[]) => Array.isArray(data)))
    .pipe(finalize(() => this.isBarangaysLoading$.next(false)))
    .subscribe((data: any) => {
      this.barangays = data;
      this.filteredBarangays = data;
      if (barangayControl) {
        barangayControl.enable();
      }
    });
  }

  onBarangayInputChange() {
    const barangay = this.locationForm.value.barangay;
    const search = barangay ? barangay.toLowerCase() : '';
    const exactMatch = this.barangays.some(b =>
      this.getBarangayName(b).toLowerCase() === search
    );

    if (search) {
      this.filteredBarangays = this.barangays.filter(b =>
        this.getBarangayName(b).toLowerCase().includes(search)
      );
      this.showBarangayDropdown = !exactMatch && this.filteredBarangays.length > 0;
    } else {
      this.filteredBarangays = this.barangays;
      this.showBarangayDropdown = false;
    }
  }

  selectBarangay(barangay: any) {
    const barangayValue = this.getBarangayName(barangay);
    this.locationForm.patchValue({ barangay: barangayValue });
    this.showBarangayDropdown = false;
  }

  getTownCityName(townCity: any): string {
    return townCity.townOrCity || townCity.name || townCity;
  }

  getBarangayName(barangay: any): string {
    return barangay.barangay || barangay.name || barangay;
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
      this.savedLocation = response;
      localStorage.setItem('savedLocation', JSON.stringify(response));
      this.toastr.success('Location saved successfully.');
    }, error => {
      console.error('Error saving location', error);
    });
  }
  
}
