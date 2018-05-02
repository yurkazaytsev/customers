import { Component, EventEmitter, OnInit,  Output } from '@angular/core';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ICustomer } from '../customer';
import { CustomerService } from '../customer.service';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css']
})

export class AddComponent implements OnInit {
  @Output() close = new EventEmitter();
  customer: ICustomer;
  title = 'Add Customer...';
  isCollapsed = true;
  genders = [
    { value: 'w', display: 'Female' },
    { value: 'm', display: 'Male' }
  ];

  minDate = {year: 1900, month: 1, day: 1};
  maxDate = {year: 2010, month: 12, day: 31};

  AngForm: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private customerservice: CustomerService,
    private fb: FormBuilder
  ) {
    this.createForm();
  }

  createForm() {
    this.AngForm = this.fb.group({
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      dob: ['', Validators.required],
      gender: []
    });
  }

  // This is wierd actually. It should be a better way
  format_date(date) {
    return new Date(date.year, date.month, date.day);
  }

  add() {
    this.customerservice.addCustomer({
      name: this.customer.name,
      gender: this.customer.gender,
      birthday: this.format_date(this.customer.birthday)
    }).subscribe( res => this.close.emit(res));
    this.isCollapsed = true;
  }

  ngOnInit() {
    this.customer = {
      customerID: null,
      name : {
        first: '',
        last: ''
      },
      birthday: null,
      gender: 'w',
      lastContact: null,
      customerLifetimeValue: 0
    };
  }
}
