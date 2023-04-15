import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { StudentDetailComponent } from './student-detail/student-detail.component';
import { StudentDetailPageComponent } from './student-detail-page.component';
import { StudentNotFoundComponent } from './student-not-found/student-not-found.component';

export const routes: Routes = [
  { path: '', component: StudentDetailComponent },
  { path: 'not-found', component: StudentNotFoundComponent },
  { path: ':studentId', component: StudentDetailComponent },
];

@NgModule({
  declarations: [
    StudentDetailComponent,
    StudentDetailPageComponent,
    StudentNotFoundComponent,
  ],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class StudentPageModule {}
