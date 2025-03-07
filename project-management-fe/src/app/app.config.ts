import {ApplicationConfig}                        from '@angular/core';
import {provideRouter, withComponentInputBinding} from '@angular/router';
import {routes}                                   from './app.routes';
import {provideAnimationsAsync}                   from '@angular/platform-browser/animations/async';
import {provideHttpClient, withInterceptors}      from '@angular/common/http';
import {httpErrorInterceptor}                     from './interceptors/error.interceptor';
import {ProjectService}                           from './services/project.service';
import {TaskService}                              from './services/task.service';

export const appConfig: ApplicationConfig = {
  providers: [
    ProjectService,
    TaskService,
    provideHttpClient(withInterceptors([httpErrorInterceptor])),
    provideRouter(routes, withComponentInputBinding()),
    provideAnimationsAsync()
  ]
};
