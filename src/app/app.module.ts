import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { MatInputModule } from '@angular/material/input';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { TodoPageComponent } from './page/todo-page/todo-page.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { StudentPageComponent } from './page/student-page/student-page.component';
import { AddModalComponent } from './page/student-page/add-modal/add-modal.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { StudentDetailPageComponent } from './page/student-detail-page/student-detail-page.component';
import { StudentDetailComponent } from './page/student-detail-page/student-detail/student-detail.component';
import { StudentNotFoundComponent } from './page/student-not-found/student-not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    StudentPageComponent,
    AddModalComponent,
    StudentDetailPageComponent,
    TodoPageComponent,
    StudentDetailComponent,
    PageNotFoundComponent,
    StudentNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    AppRoutingModule,
    NgbModule,
  ],
  providers: [],
  bootstrap: [AppComponent, AddModalComponent, StudentPageComponent],
})
export class AppModule {}
