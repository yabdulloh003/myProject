import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProjectAddPage } from './project-add.page';

describe('ProjectAddPage', () => {
  let component: ProjectAddPage;
  let fixture: ComponentFixture<ProjectAddPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProjectAddPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProjectAddPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
