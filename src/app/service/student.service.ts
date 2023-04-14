import { Injectable } from '@angular/core';
import { IStudentDetail } from '../page/student-detail-page/student-detail-page.component';
import { Observable, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private students = [
    { id: 1, name: 'Nguyễn Văn A', address: 'Hai bà trưng', gender: 'Nam' },
    { id: 2, name: 'Nguyễn Văn B', address: 'Đống Đa', gender: 'Nữ' },
    { id: 3, name: 'Nguyễn Văn C', address: 'Cầu Giấy', gender: 'Nam' },
  ];

  studentActive$ = new Subject<IStudentDetail | undefined>();

  constructor() {}

  getStudents() {
    return this.students;
  }

  setStudentActive(studentId: number | string) {
    this.studentActive$.next(
      this.students.find((student: IStudentDetail) => student.id == studentId)
    );
  }

  getStudentById(studentId: number | string) {
    return this.students.find(
      (student: IStudentDetail) => student.id == studentId
    );
  }
}
