import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TodoPageTableComponent } from './todo-page-table.component';

describe('TodoPageTableComponent', () => {
  let component: TodoPageTableComponent;
  let fixture: ComponentFixture<TodoPageTableComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TodoPageTableComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TodoPageTableComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
