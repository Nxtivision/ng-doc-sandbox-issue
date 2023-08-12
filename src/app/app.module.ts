import { provideSearchEngine, NgDocDefaultSearchEngine } from "@ng-doc/app";
import { NgDocModule } from "@ng-doc/app";
import { NG_DOC_ROUTING, NgDocGeneratedModule } from "@ng-doc/generated";
import { RouterModule } from "@angular/router";
import { NgDocSidebarModule } from "@ng-doc/app/components/sidebar";
import { NgDocNavbarModule } from "@ng-doc/app/components/navbar";
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
      NgDocNavbarModule,
      NgDocSidebarModule,
      RouterModule.forRoot(NG_DOC_ROUTING, {scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', scrollOffset: [0, 70]}),
      NgDocModule.forRoot(),
      NgDocGeneratedModule.forRoot()
],
  providers: [provideSearchEngine(NgDocDefaultSearchEngine)],
  bootstrap: [AppComponent]
})
export class AppModule { }
