import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barista',
  templateUrl: './barista.component.html',
  styleUrls: ['./barista.component.css']
})
export class BaristaComponent implements OnInit {

 items = [
    {
      name: 'Home',
      path: ''
    },
    {
      name: 'Checklist',
      path: 'checklistBarista'
    },
    {
      name: 'Profiel',
      path: 'checklist'
    }
  ]
  constructor() { }

  ngOnInit() {
  }

}
