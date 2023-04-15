import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './page/home-page/home-page.component';
import { PageNotFoundComponent } from './page/page-not-found/page-not-found.component';
import { StudentDetailPageComponent } from './page/student-detail-page/student-detail-page.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'task1',
    loadChildren: () =>
      import('./page/student-page/student-page.module').then(
        (m) => m.StudentPageModule
      ),
  },
  {
    path: 'task2',
    component: StudentDetailPageComponent,
    loadChildren: () =>
      import('./page/student-detail-page/student-detail-page.module').then(
        (m) => m.StudentPageModule
      ),
  },
  {
    path: 'task3',
    loadChildren: () =>
      import('./page/todo-page/todo-page.module').then((m) => m.TodoPageModule),
  },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
