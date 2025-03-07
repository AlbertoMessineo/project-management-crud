import {Routes}                 from '@angular/router';
import {SingleProjectComponent} from './components/single-project/single-project.component';
import {MainComponent}          from './main/main.component';

export const routes: Routes = [
    {
      path: 'home',
      component: MainComponent
    },
    {
      path: 'project/:id',
      component: SingleProjectComponent
    },
    {
      path: '',
      redirectTo: 'home',
      pathMatch: 'full'
    }
  ]
;
