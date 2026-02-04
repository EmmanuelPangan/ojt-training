import { Component } from '@angular/core';

@Component({
  selector: 'app-listcomponent',
  templateUrl: './listcomponent.component.html',
  styleUrls: ['./listcomponent.component.css']
})
export class ListcomponentComponent {
  items = [
    {
      id: 1, name: 'Interpolation', description: 'a mathematical method used to estimate unknown values that fall within the range of a discrete set of known data points.'
    },
    { id: 2, name: 'Event Binding', description: 'connects user actions—such as clicks, keystrokes, or mouse movements—to component methods.' }
  ];



}
