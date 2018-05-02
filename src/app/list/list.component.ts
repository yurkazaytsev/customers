import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../customer.service';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {

  customers: any;

  constructor(
    private http: HttpClient,
    private service: CustomerService
  ) { }

  ngOnInit() {
    this.getCustomers();
  }

  close(some) {
    if(some){ this.getCustomers();}
  }

  getCustomers() {
      this.service.getCustomers().subscribe(res => {
      this.customers = res;
  });
}

  deleteCustomer(id) {
    this.service.deleteCustomer(id).subscribe(res => {
      console.log('Deleted');
      this.getCustomers();
    });
  }
}
