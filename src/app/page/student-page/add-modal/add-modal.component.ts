import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import {
  AbstractControl,
  AsyncValidatorFn,
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { IStudent } from '../student-page.component';
interface TFormValue {
  name: string;
  email: string;
}
@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.scss'],
})
export class AddModalComponent implements OnInit, OnChanges, OnDestroy {
  @Input() handleSubmit: (data: any) => void;
  @Input() modalType: string | undefined;
  @Input() selectedStudentIndex: number | undefined;
  @Input() editStudentDetails: IStudent | undefined;
  @Input() openModal: () => void;
  @Input() closeModal: () => void;
  @Output() handleDeleteStudent = new EventEmitter<number>();
  @Output() handleEditStudent = new EventEmitter<{
    studentInfo: IStudent;
    index: number | undefined;
  }>();
  @ViewChild('addModal') addModal!: ElementRef<HTMLElement>;

  myForm: FormGroup;
  isSubmitted = false;
  name: string = '';
  country: string = '';
  genderSelected: string = '';
  listStudents: IStudent[] = [];
  backdropModal = document.querySelector('modal-backdrop');

  constructor(private fb: FormBuilder, private modalService: NgbModal) {
    this.handleSubmit = (data: any) => {};
    this.openModal = () => {};
    this.closeModal = () => {};
    this.myForm = this.fb.group({
      name: [
        '',
        Validators.compose([Validators.required, Validators.maxLength(50)]),
        this.validateName(),
      ],
      country: ['', [Validators.required]],
      genderByIndex: ['', [Validators.required]],
    });
  }

  ngOnDestroy(): void {
    this.isSubmitted = false;
    this.myForm.reset();
    console.log('unmount');
  }

  ngOnChanges(changes: SimpleChanges): void {}

  ngOnInit(): void {
    this.listStudents = JSON.parse(localStorage.getItem('students') || '{}');

    this.myForm.setValue({
      name: this.editStudentDetails?.name,
      country: this.editStudentDetails?.country,
      genderByIndex: this.editStudentDetails?.genderByIndex,
    });
    console.log('mount');
  }

  // This can be handle by oneway binding
  handleDelete(index: number | undefined) {
    this.handleDeleteStudent.emit(index);
    this.closeModal();
  }

  handleEdit(index: number | undefined) {
    const nameValue = this.myForm.get('name')?.value;
    if (
      nameValue !== this.editStudentDetails?.name &&
      this.myForm.get('name')?.errors?.['nameExists']
    ) {
      // to log error validation name Exist after submit
      this.isSubmitted = true;
    } else {
      // submit edit here
      this.handleEditStudent.emit({
        studentInfo: this.myForm.value,
        index: index,
      });
      this.isSubmitted = false;
      this.myForm.reset();
      this.closeModal();
    }
  }

  validateName(): AsyncValidatorFn {
    return (
      control: AbstractControl
    ):
      | Promise<{ [key: string]: any } | null>
      | Observable<{ [key: string]: any } | null> => {
      const value = control.value;
      return this.checkName(value).pipe(
        map((res) => {
          return res ? { nameExists: true } : null;
        })
      );
    };
  }

  checkName(name: string): Observable<boolean> {
    // Observable do what? Why can't return direct {[key: string]: string}?
    return new Observable<boolean>((observer) => {
      const exists = JSON.parse(localStorage.getItem('students') || '[]').find(
        (student: any) => student.name === name
      );
      observer.next(exists);
      observer.complete();
    });
  }

  onSubmit(formControl: any) {
    this.isSubmitted = true;
    console.log(this.myForm.valid);
    if (this.myForm.valid) {
      this.handleSubmit(formControl.value);
      this.myForm.reset();
      this.closeModal();
      this.isSubmitted = false;
      console.log('submit');
    }
  }
}
