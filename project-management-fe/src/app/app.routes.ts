import { Routes } from '@angular/router';
import {ProjectComponent} from './components/project-list/project.component';
import {SingleProjectComponent} from './components/single-project/single-project.component';


export const routes: Routes = [
  { path: '', component: ProjectComponent},
  { path: 'project/:id', component: SingleProjectComponent },
];
