import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { StudentService } from 'src/app/service/student.service';
import { IStudentDetail } from '../student-detail-page.component';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.scss'],
})
export class StudentDetailComponent implements OnInit, OnDestroy {
  studentId: number | undefined;
  studentInfo: IStudentDetail | undefined;
  subscription: Subscription;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private studentsSV: StudentService
  ) {
    console.log('mount2');
    this.subscription = this.studentsSV.studentActive$.subscribe(
      (studentActive) => {
        this.studentInfo = studentActive;
        this.studentId = studentActive?.id;
        console.log('form child: ', studentActive);
      }
    );
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (value) => {
        if (!value['studentId']) {
          this.studentsSV.setStudentActive(1);
        } else if (
          this.studentsSV
            .getStudents()
            .find((student: IStudentDetail) => student.id == value['studentId'])
        ) {
          this.studentsSV.setStudentActive(value['studentId']);
        } else {
          this.router.navigate(['/task2', 'not-found']);
          console.log('navigate');
        }
      },
    });
  }

  ngAfterViewInit() {}
}
