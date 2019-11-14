import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetApiPage } from './set-api.page';

describe('SetApiPage', () => {
    let component: SetApiPage;
    let fixture: ComponentFixture<SetApiPage>;

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SetApiPage],
            schemas: [CUSTOM_ELEMENTS_SCHEMA],
        })
            .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(SetApiPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
