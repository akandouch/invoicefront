import { Entity } from "../entity.interface";

export class Upload implements Entity {
  public id: string;
  public contentType: string;
  public fileName: string;
  public upload: Blob;
  public newUpload: Blob;
}
