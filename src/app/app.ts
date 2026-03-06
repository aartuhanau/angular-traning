import {Component} from '@angular/core';
import { AppHeader } from './core/components/app-header/app-header';
import { RouterOutlet } from '@angular/router'; 

@Component({
  selector: 'app-root',
  imports: [AppHeader, RouterOutlet],
  templateUrl: 'app.component.html',
  styleUrls: ['./app.css'],
})
export class App {
  title = 'default';
}

