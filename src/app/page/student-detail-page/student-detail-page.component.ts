import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';

import { StudentService } from './../../service/student.service';

export interface IStudentDetail {
  id: number;
  name: string;
  address: string;
  gender: string;
}
@Component({
  selector: 'app-student-detail-page',
  templateUrl: './student-detail-page.component.html',
  styleUrls: ['./student-detail-page.component.scss'],
})
export class StudentDetailPageComponent implements OnInit, OnDestroy {
  students: IStudentDetail[];
  activeStudentId: number | undefined;
  subscription: Subscription;

  constructor(
    private router: Router,
    private studentsSV: StudentService,
    private route: ActivatedRoute
  ) {
    console.log('mount1');
    this.students = this.studentsSV.getStudents();
    this.subscription = this.studentsSV.studentActive$.subscribe(
      (studentActive) => {
        this.activeStudentId = studentActive?.id;
        console.log('form parent: ', studentActive);
      }
    );
  }

  ngOnInit(): void {
    // render first student
    // this.navigateToStudentDetail(1);
    this.studentsSV.setStudentActive(1);
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  navigateToStudentDetail(studentId: number) {
    // this.studentsSV.setStudentActive(studentId);
    this.router.navigate(['/task2', studentId]);
  }
}
