import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { APP_BASE_HREF } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

import { appRoutes } from '../routerConfig';
import { CustomerService } from '../customer.service';

import { EditComponent } from '../edit/edit.component';
import { ListComponent } from './list.component';
import { AddComponent } from '../add/add.component';


describe('ListComponent', () => {
  let component: ListComponent;
  let fixture: ComponentFixture<ListComponent>;

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
    fixture = TestBed.createComponent(ListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create component', () => {
    expect(component).toBeTruthy();
  });
});
