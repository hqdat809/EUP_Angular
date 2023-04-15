import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomePageComponent } from './page/home-page/home-page.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { AddModalComponent } from './page/student-page/add-modal/add-modal.component';
import { StudentPageComponent } from './page/student-page/student-page.component';
@NgModule({
  declarations: [AppComponent, PageNotFoundComponent, HomePageComponent],
  imports: [BrowserModule, AppRoutingModule],
  providers: [],
  bootstrap: [AppComponent, AddModalComponent, StudentPageComponent],
})
export class AppModule {}
