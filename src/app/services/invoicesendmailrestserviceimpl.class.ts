import { InvoiceRestServiceImpl } from "./invoicerestserviceimpl.class";

export class InvoiceSendMailRestServiceImpl extends InvoiceRestServiceImpl {
    path:string = this.path + "/" + "send-mail";
}