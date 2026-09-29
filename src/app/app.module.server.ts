import { NgModule } from '@angular/core';
import { provideServerRendering, withRoutes } from '@angular/ssr';
import { App } from './app';
import { MyApplicationModule } from './app.module';
import { serverRoutes } from './app.routes.server';

@NgModule({
  imports: [MyApplicationModule],
  providers: [provideServerRendering(withRoutes(serverRoutes))],
  bootstrap: [App],
})
export class AppServerModule {}
