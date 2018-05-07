import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { TestBed, inject } from '@angular/core/testing';

import { CustomerService } from './customer.service';


describe('CustomerService', () => {
  let httpClient: HttpClient;
  let httpTestingController: HttpTestingController;
  let customerService: CustomerService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule ],
      providers: [ CustomerService ]
    });

    httpClient = TestBed.get(HttpClient);
    httpTestingController = TestBed.get(HttpTestingController);
    customerService = TestBed.get(CustomerService);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  describe('#getCustomers', () => {
    let expectedCustomers: any[];

    beforeEach(() => {
      customerService = TestBed.get(CustomerService);
      expectedCustomers = [
        {
            customerID: 1,
            name: {
                first: 'Peter',
                last: 'Smith'
            },
            birthday: '1996-10-12',
            gender: 'm',
            lastContact: '2017-06-01T23:28:56.782Z',
            customerLifetimeValue: 191.12
        },
        {
            customerID: 2,
            name: {
                first: 'Anna',
                last: 'Hopp'
            },
            birthday: '1987-05-03',
            gender: 'w',
            lastContact: '2017-07-08T13:18:56.888Z',
            customerLifetimeValue: 50.99
        }
      ];
    });

    it('should return expected customers (called once)', () => {

      customerService.getCustomers().subscribe(
        customers => expect(customers).toEqual(expectedCustomers, 'should return expected customers'),
        fail
      );


      const req = httpTestingController.expectOne(customerService.customersUrl);
      expect(req.request.method).toEqual('GET');

      req.flush(expectedCustomers);
    });

    it('should be OK returning no customers', () => {

      customerService.getCustomers().subscribe(
        customers => expect(customers).toEqual([], 'should have empty customers array'),
        fail
      );

      const req = httpTestingController.expectOne(customerService.customersUrl);
      req.flush([]);
    });

    it('should turn 404 into an empty customers result', () => {

      customerService.getCustomers().subscribe(
        customers => expect(customers).toEqual([], 'should return empty customers array'),
        fail
      );

      const req = httpTestingController.expectOne(customerService.customersUrl);

      const msg = 'deliberate 404 error';
      req.flush(msg, {status: 404, statusText: 'Not Found'});
    });

    it('should return expected customers (called multiple times)', () => {

      customerService.getCustomers().subscribe();
      customerService.getCustomers().subscribe();
      customerService.getCustomers().subscribe(
        customers => expect(customers).toEqual(expectedCustomers, 'should return expected customers'),
        fail
      );

      const requests = httpTestingController.match(customerService.customersUrl);
      expect(requests.length).toEqual(3, 'calls to getCustomers()');

      requests[0].flush([]);
      requests[1].flush([{
                  customerID: 2,
                  name: {
                      first: 'Anna',
                      last: 'Hopp'
                  },
                  birthday: '1987-05-03',
                  gender: 'w',
                  lastContact: '2017-07-08T13:18:56.888Z',
                  customerLifetimeValue: 50.99
              }]);
      requests[2].flush(expectedCustomers);
    });

  });

  describe('#addCustomer', () => {
    const makeUrl = () => `${customerService.customersUrl}/add`;

    it('should return succesfull message on add', () => {
      const newCustomer = {
                  name: {
                      first: 'First',
                      last: 'Last'
                  },
                  birthday: '1999-01-01',
                  gender: 'w'
              };
      const successMsg = {'customer': 'Customer added successfully'};

      customerService.addCustomer(newCustomer).subscribe(
        data => expect(data).toEqual(successMsg, 'should return success message'),
        fail
      );

      const req = httpTestingController.expectOne(customerService.customersUrl + '/add');
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(newCustomer);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: successMsg });
      req.event(expectedResponse);
    });

  });

  describe('#editCustomer', () => {
    const makeUrl = (id) => `${customerService.customersUrl}/edit/${id}`;

    it('should return succesfull message to edit', () => {
      const editCustomer = {
                  customerID: 2,
                  name: {
                      first: 'Anna',
                      last: 'Hopp'
                  },
                  birthday: '1987-05-03',
                  gender: 'w',
                  lastContact: '2017-07-08T13:18:56.888Z',
                  customerLifetimeValue: 50.99
              };

      customerService.editCustomer(editCustomer.customerID).subscribe(
        data => expect(data).toEqual(editCustomer, 'should return customer'),
        fail
      );

      const req = httpTestingController.expectOne(makeUrl(editCustomer.customerID));
      expect(req.request.method).toEqual('GET');

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: editCustomer });
      req.event(expectedResponse);
    });

  });

  describe('#updateCustomer', () => {
    const makeUrl = (id) => `${customerService.customersUrl}/update/${id}`;

    it('should return succesfull message to update', () => {
      const updateCustomer = {
                  name: {
                      first: 'Anna',
                      last: 'Hopp'
                  },
                  birthday: '1987-05-03',
                  gender: 'w',
                  lastContact: '2017-07-08T13:18:56.888Z',
                  customerLifetimeValue: 50.99
              };

      const id = 2;
      const successMessage = 'success message';

      customerService.updateCustomer(updateCustomer, id).subscribe(
        data => expect(data).toEqual(successMessage, 'should return successMessage'),
        fail
      );

      const req = httpTestingController.expectOne(makeUrl(id));
      expect(req.request.method).toEqual('POST');
      expect(req.request.body).toEqual(updateCustomer);

      const expectedResponse = new HttpResponse(
        { status: 200, statusText: 'OK', body: successMessage });
      req.event(expectedResponse);
    });

  });

});
