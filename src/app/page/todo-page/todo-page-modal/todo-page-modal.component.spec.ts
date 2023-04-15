import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPageModalComponent } from './todo-page-modal.component';

describe('TodoPageModalComponent', () => {
  let component: TodoPageModalComponent;
  let fixture: ComponentFixture<TodoPageModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoPageModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPageModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
