import {Component, Inject, Input, OnInit} from '@angular/core';
import {UploadRestServiceImpl} from '../services/uploadrestserviceimpl.class';
import {RestService} from '../services/restservice.interface';
import {Upload} from '../upload/upload.class';

@Component({
  selector: 'app-image-loader',
  templateUrl: './image-loader.component.html',
  styleUrls: ['./image-loader.component.css']
})
export class ImageLoaderComponent implements OnInit {

  @Input()
  public image: Upload;
  @Input()
  public width: string;
  @Input()
  public height: string;

  public imageBase64: string;

  constructor(@Inject(UploadRestServiceImpl) private uploadService: RestService) {

  }

  ngOnInit() {
    this.uploadService.getImage(this.image, (data) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        this.imageBase64 = reader.result;
      };
      reader.readAsDataURL(data);
    });
  }

}
