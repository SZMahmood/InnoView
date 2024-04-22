import { ViewEncapsulation } from '@angular/core';
import { Component } from '@angular/core';
//import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
  encapsulation: ViewEncapsulation.None
})
export class AppComponent {
  title = 'InnoView';

}
