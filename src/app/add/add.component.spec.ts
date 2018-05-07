import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { AddComponent } from './add.component';
import { ListComponent } from '../list/list.component';
import { EditComponent } from '../edit/edit.component';

import { appRoutes } from '../routerConfig';
import { CustomerService } from '../customer.service';

describe('AddComponent', () => {
  let component: AddComponent;
  let fixture: ComponentFixture<AddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        FormsModule,
        ReactiveFormsModule,
        RouterModule.forRoot(appRoutes, {onSameUrlNavigation: 'reload'}),
        HttpClientModule
      ],
      declarations: [
        AddComponent,
        ListComponent,
        EditComponent
      ],
      providers: [
        { provide: APP_BASE_HREF, useValue : '/' },
        CustomerService
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
