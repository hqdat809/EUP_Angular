import {
  ChangeDetectorRef,
  Component,
  OnInit,
  ViewChild,
  ElementRef,
} from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

import { MODAL_TYPE } from '../../interface/global';

export interface IStudent {
  name: string;
  country: string;
  gender: string;
  genderByIndex: number;
}

@Component({
  selector: 'student-page',
  templateUrl: './student-page.component.html',
  styleUrls: ['./student-page.component.scss'],
})
export class StudentPageComponent implements OnInit {
  selectedGender: number | null = null;
  isOpenModal: boolean = false;
  students: IStudent[] = [];
  actionType: MODAL_TYPE = MODAL_TYPE.ADD_MODAL;
  selectedStudent: IStudent | undefined;
  selectedStudentIndex: number | undefined;
  editStudentDetails: IStudent | undefined;
  @ViewChild('content') content!: ElementRef<HTMLElement>;

  constructor(private cdr: ChangeDetectorRef, private modalService: NgbModal) {}

  ngOnInit(): void {
    this.students = localStorage.getItem('students')
      ? JSON.parse(localStorage.getItem('students') || '')
      : [];
  }

  openModal() {
    this.modalService.open(this.content);
  }

  closeModal() {
    this.modalService.dismissAll();
  }

  onClickDeleteBtn = (student: IStudent, studentIndex: number) => {
    this.actionType = MODAL_TYPE.DELETE_MODAL;
    this.selectedStudent = this.students.find(
      (student: IStudent, index: number) => index === studentIndex
    );
    this.selectedStudentIndex = studentIndex;
    this.openModal();
  };

  onDelete = (index: number | undefined) => {
    this.students = this.students.filter(
      (student: IStudent, studentIdx: number) => studentIdx !== index
    );
    localStorage.setItem('students', JSON.stringify(this.students));
  };

  onClickEditBtn = (student: IStudent, studentIndex: number) => {
    this.actionType = MODAL_TYPE.EDIT_MODAL;
    this.selectedStudentIndex = studentIndex;
    this.editStudentDetails = student;
    this.openModal();
  };

  onEdit = (infoStudent: {
    studentInfo: IStudent;
    index: number | undefined;
  }) => {
    this.students = this.students.map((student: IStudent, index: number) => {
      if (index === infoStudent.index) {
        return {
          ...infoStudent.studentInfo,
          gender: infoStudent.studentInfo.genderByIndex == 0 ? 'Nam' : 'Nữ',
          genderByIndex: Number(infoStudent.studentInfo.genderByIndex),
        };
      }
      return student;
    });
    localStorage.setItem('students', JSON.stringify(this.students));
  };

  onClickAddBtn = () => {
    this.actionType = MODAL_TYPE.ADD_MODAL;
    this.editStudentDetails = undefined;
    this.openModal();
  };

  onAdd = (data: any) => {
    const dataConverted = {
      ...data,
      gender: data.genderByIndex == 0 ? 'Nam' : 'Nữ',
      genderByIndex: Number(data.genderByIndex),
    };
    const newListStudents = [...this.students, dataConverted];
    localStorage.setItem('students', JSON.stringify(newListStudents));
    this.students = newListStudents;
  };
}
