import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { FormGroup,  FormBuilder,  Validators } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
// import 'rxjs/add/observable/of';
import { catchError, map, tap } from 'rxjs/operators';
import 'rxjs/add/operator/map';

@Injectable()
export class CustomerService {

  customersUrl = 'http://localhost:4000/customers';

  constructor(private http: HttpClient) { }

  addCustomer(customer) {
    const uri = `${this.customersUrl}/add`;
    return this.http.post(uri, customer).map(res => res);
  }

  getCustomers() {
    const uri = `${this.customersUrl}`;
    return this.http.get(uri)
      .pipe(
        catchError(error => {
          console.log(error) ;
          return [];
        })
      );
  }

  editCustomer(id) {
    const uri = `${this.customersUrl}/edit/${id}`;
    return this.http.get(uri).map(res => res);
  }

  updateCustomer(customer, id) {
    const uri = `${this.customersUrl}/update/${id}`;
    return this.http.post(uri, customer).map(res => res);
  }

  deleteCustomer(id) {
    const uri = `${this.customersUrl}/delete/${id}`;
    console.log(uri);
    return this.http.get(uri);
  }

}
