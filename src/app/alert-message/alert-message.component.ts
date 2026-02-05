import { Component, OnInit } from '@angular/core';
import { AlertServiceService } from '../alert/alert-service.service';
@Component({
  selector: 'app-alert-message',
  templateUrl: './alert-message.component.html',
  styleUrls: ['./alert-message.component.css']
})
export class AlertMessageComponent implements OnInit {
  message: '';

  constructor(private alertService:AlertServiceService) 
  {

  }

  ngOnInit() {
    this.alertService.message$.subscribe(message => {
      if (message) {
        alert(message);
      }
    });
  }

}
