import {Component, Inject, OnInit} from '@angular/core';
import {InvoiceProfile} from './invoiceprofile.class';
import {NgbActiveModal, NgbModal} from '@ng-bootstrap/ng-bootstrap';
import {faCoffee, faCopy, faEdit, faEllipsisH, faEye, faPlus, faSave, faTrashAlt, faWindowClose} from '@fortawesome/free-solid-svg-icons';
import {Upload} from '../upload/upload.class';
import {RestService} from '../services/restservice.interface';
import {UploadRestServiceImpl} from '../services/uploadrestserviceimpl.class';
import {InvoiceProfileRestServiceImpl} from '../services/invoiceprofilerestserviceimpl.class';
import {DataColumn} from '../data-table/data-table.component';


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

  public dataColumns:Array<DataColumn> = [
    {field: {name: 'firstname'}, label: 'common.firstname'},
    {field: {name: 'lastname'}, label: 'common.lastname'},
    {field: {name: 'mail'}, label: 'common.mail'},
    {field: {name: 'vat'}, label: 'common.vat'}
  ]

  constructor(
    private ngbModalService: NgbModal, 
    @Inject(UploadRestServiceImpl) private uploadService:RestService,
    @Inject(InvoiceProfileRestServiceImpl) public invoiceProfileService:RestService
    ) {
    this.newInvoiceProfile = new InvoiceProfile();
    this.getAll();
  }

  ngOnInit() {
  }

  getAll() {
    this.invoiceProfileService.get({},(data)=>{
      this.profiles = data;
    })
  }

  save(invoiceProfile: InvoiceProfile) {
    this.invoiceProfileService.post(invoiceProfile,()=>{
      this.getAll();
      this.closeModal();
    },
    ()=>{
      alert('error happens my frend')
    },
    ()=>{
      alert('profile created successfully')
    })
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
    this.invoiceProfileService.post(profile,()=>{
      this.getAll();
    },
    ()=>{
      alert('error happens my frend')
    },
    ()=>{
      alert('profile updated successfully')
    })
  }

  editItem(content, invoiceProfile: InvoiceProfile, idx?: number) {
    this.currentProfile = invoiceProfile;
    //this.currentIdx = idx;
    this.currentModal = this.ngbModalService.open(content, {
      backdrop: 'static',
      keyboard: false
    });
  }

  removeItem(invoiceProfile: InvoiceProfile) {
    this.invoiceProfileService.delete(invoiceProfile,()=>{
      this.getAll();
    })
  }

  closeModal() {
    this.currentModal.close();
  }

  getLogo(upload: Upload) {
    const uploadUrl = this.uploadService.getResourcePath(upload);//this.ds.getUploadUrl(upload.id);
    return uploadUrl;
  }

  changeLogo(event: any, profile: InvoiceProfile) {
    this.loadingLogo = true;
    const blob = event.srcElement.files[0];
    const fileReader = new FileReader();
    fileReader.addEventListener('load', () => {
      console.log('loading logo ...');
      profile.logo = new Upload();
      profile.logo.contentType = blob.type;
      profile.logo.fileName = blob.name;
      profile.logo.newUpload = fileReader.result.split(',')[1];
      this.uploadService.post(profile.logo,(u)=>{
        profile.logo = u;
        this.loadingLogo = false;
      })
    });
    fileReader.readAsDataURL(blob);
  }
  refreshGrid(data){
    this.profiles = data;
  }

}
