import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProjectComponent } from '../project/project.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProjectComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
