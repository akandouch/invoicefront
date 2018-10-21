import {Component, OnInit} from '@angular/core';
import {InvoiceProfile} from './invoiceprofile.class';
import {DataService} from '../data.service';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faCoffee, faCopy, faEdit, faEllipsisH, faEye, faPlus, faSave, faTrashAlt, faWindowClose} from '@fortawesome/free-solid-svg-icons';


@Component({
  selector: 'app-invoiceprofile',
  templateUrl: './invoiceprofile.component.html',
  styleUrls: ['./invoiceprofile.component.css']
})
export class InvoiceprofileComponent implements OnInit {

  public newInvoiceProfile: InvoiceProfile;
  public profiles: InvoiceProfile[];
  public currentModal: NgbActiveModal;
  faSave = faSave;
  faWindowClose = faWindowClose;
  faPlus = faPlus;
  faCoffee = faCoffee;
  faEye = faEye;
  faTrashAlt = faTrashAlt;
  faCopy = faCopy;
  faEllipsisH = faEllipsisH;
  faEdit = faEdit;

  public currentProfile: InvoiceProfile;
  public currentIdx: number;
  public loadingLogo: boolean = false;

  constructor(private ds: DataService, private ngbModalService: NgbModal) {
    this.newInvoiceProfile = new InvoiceProfile();
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this.ds.getInvoiceProfiles().subscribe(data => this.profiles = data);
  }

  save(invoiceProfile: InvoiceProfile) {
    this.ds.postInvoiceProfile(invoiceProfile, () => {
      this.getAll();
      this.closeModal();
    });
    this.newInvoiceProfile = new InvoiceProfile();
  }

  openModal(content) {
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  copyItem(profile: InvoiceProfile) {
    profile.id = null;
    this.ds.postInvoiceProfile(profile, () => {
      this.getAll();
    });
  }

  editItem(content, invoiceProfile: InvoiceProfile, idx: number) {
    this.currentProfile = invoiceProfile;
    this.currentIdx = idx;
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  removeItem(invoiceProfile: InvoiceProfile) {
    this.ds.deleteInvoiceProfile(invoiceProfile, () => this.getAll());
  }

  closeModal() {
    this.currentModal.close();
  }

  changeLogo(event: any, profile: InvoiceProfile) {
    this.loadingLogo = true;
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      console.log('loading logo ...');
      profile.logo = fileReader.result;
      // setTimeout(()=>{},2000);
      this.loadingLogo = false;
    });
    const blob = event.srcElement.files[0];
    fileReader.readAsDataURL(blob);
  }

}
