import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { StudentPageComponent } from './page/student-page/student-page.component';
import { StudentDetailPageComponent } from './page/student-detail-page/student-detail-page.component';
import { TodoPageComponent } from './page/todo-page/todo-page.component';
import { StudentDetailComponent } from './page/student-detail-page/student-detail/student-detail.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { StudentNotFoundComponent } from './page/student-not-found/student-not-found.component';
import { AppComponent } from './app.component';
import { HomePageComponent } from './page/home-page/home-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'task1',
    component: StudentPageComponent,
  },
  {
    path: 'task2',
    component: StudentDetailPageComponent,
    children: [
      { path: '', component: StudentDetailComponent },
      { path: 'not-found', component: StudentNotFoundComponent },
      { path: ':studentId', component: StudentDetailComponent },
    ],
  },
  { path: 'task3', component: TodoPageComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
