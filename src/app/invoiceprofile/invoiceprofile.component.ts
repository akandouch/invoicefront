import { Component, OnInit } from '@angular/core';
import { InvoiceProfile } from './invoiceprofile.class';
import { DataService } from '../data.service';
import { NgbModal, NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { faSave, faWindowClose, faPlus,faCoffee,faEye,faTrashAlt, faCopy } from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-invoiceprofile',
  templateUrl: './invoiceprofile.component.html',
  styleUrls: ['./invoiceprofile.component.css']
})
export class InvoiceprofileComponent implements OnInit {

  private newInvoiceProfile:InvoiceProfile;
  private profiles:InvoiceProfile[];
  private currentModal: NgbActiveModal;
  faSave=faSave;faWindowClose=faWindowClose;faPlus=faPlus;faCoffee = faCoffee;faEye = faEye;faTrashAlt = faTrashAlt;faCopy = faCopy;
 
  private currentProfile:InvoiceProfile;
  private currentIdx:number;

  constructor(private ds:DataService, private ngbModalService:NgbModal) { 
    this.newInvoiceProfile = new InvoiceProfile();
    this.getAll();
  }

  ngOnInit() {
  }
  
  getAll(){
    this.ds.getInvoiceProfiles().subscribe(data=>this.profiles =data);
  }

  save(invoiceProfile:InvoiceProfile){
    this.ds.postInvoiceProfile(invoiceProfile, ()=>this.getAll());
  }

  openModal(content){
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard:false
    });
  }
  editItem(content,invoiceProfile:InvoiceProfile,idx:number){
    this.currentProfile = invoiceProfile;
    this.currentIdx = idx;
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard:false
    });
  }
  removeItem(invoiceProfile:InvoiceProfile){
    this.ds.deleteInvoiceProfile(invoiceProfile,()=>this.getAll());
  }

}
