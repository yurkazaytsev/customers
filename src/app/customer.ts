interface IName {
  first: string;
  last: string;
}

export interface ICustomer {
  customerID: number;
  name: IName;
  birthday: Date;
  gender: 'w'|'m';
  lastContact: Date;
  customerLifetimeValue: number;
}
