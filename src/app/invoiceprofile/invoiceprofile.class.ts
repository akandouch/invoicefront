import {Address} from './address.class';
import {Upload} from '../upload/upload.class';

export class InvoiceProfile {

  public id: string;
  public firstname: string;
  public lastname: string;
  public active: boolean;
  public customer: boolean;
  public vat: string;
  public mail: string;
  public phoneNumber: string;
  public accountNumber: string;
  public address: Address;
  public logo: Upload;

  constructor() {
    this.address = new Address();
  }


}
