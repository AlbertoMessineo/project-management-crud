import { Component } from '@angular/core';
import { AppComponent } from '../app.component';
import { ProjectComponent } from '../project-list/project.component';
import { InputFieldComponent } from '../input-field/input-field.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProjectComponent, InputFieldComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
