import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { StudentPageComponent } from './student-page.component';
import { AddModalComponent } from './add-modal/add-modal.component';
import { ReactiveFormsModule } from '@angular/forms';

export const routes: Routes = [
  {
    path: '',
    component: StudentPageComponent,
  },
];

@NgModule({
  declarations: [StudentPageComponent, AddModalComponent],
  imports: [CommonModule, ReactiveFormsModule, RouterModule.forChild(routes)],
})
export class StudentPageModule {}
