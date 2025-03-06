import { Component } from '@angular/core';
import { AppComponent }        from '../app.component';
import { ProjectComponent }    from '../components/project-list/project.component';
import { InputFieldComponent } from '../components/input-field/input-field.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [ProjectComponent, InputFieldComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss'
})
export class MainComponent {

}
