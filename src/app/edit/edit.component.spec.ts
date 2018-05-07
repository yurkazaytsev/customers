import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBootstrapFormValidationModule } from 'ng-bootstrap-form-validation';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from '../routerConfig';
import { CustomerService } from '../customer.service';

import { EditComponent } from './edit.component';
import { ListComponent } from '../list/list.component';
import { AddComponent } from '../add/add.component';


describe('EditComponent', () => {
  let component: EditComponent;
  let fixture: ComponentFixture<EditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
        HttpClientModule,
        NgBootstrapFormValidationModule.forRoot()
      ],
      declarations: [
        EditComponent,
        ListComponent,
        AddComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        CustomerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
