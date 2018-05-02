import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CustomerService } from '../customer.service';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  customer;
  dob;
  lastContact;
  AngForm: FormGroup;
  title = 'Edit Customer';
  genders = [
    { value: 'w', display: 'Female' },
    { value: 'm', display: 'Male' }
  ];

  constructor(private route: ActivatedRoute, private router: Router, private service: CustomerService, private fb: FormBuilder) {
    this.createForm();
   }

   createForm() {
     this.AngForm = this.fb.group({
       first_name: ['', Validators.required],
       last_name: ['', Validators.required],
       dob: ['', Validators.required],
       gender: [],
       lifetime: ['', Validators.required],
       last_contact: ['', Validators.required]
     });
   }

  updateCustomer() {
    this.route.params.subscribe(params => {
      this.service.updateCustomer({
        name: this.customer.name,
        gender: this.customer.gender,
        birthday: new Date(this.dob.year, this.dob.month, this.dob.day),
        lastContact: new Date(this.lastContact),
        customerLifetimeValue: this.customer.customerLifetimeValue
      }, params['id']).subscribe(() => this.router.navigateByUrl(''));
  });
}

  to_date(date_string) {
    const x = new Date(date_string);
    return {
      year: x.getFullYear(),
      month: x.getMonth(),
      day: x.getDate()
    };
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.customer = {
        name: {
           first: '',
           last: ''
         },
      };
      this.service.editCustomer(params['id']).subscribe(res => {
        this.customer = res;
        this.dob = this.to_date(this.customer.birthday);
        this.lastContact = this.customer.lastContact.substring(0, 16);
      });
    });
  }
}
