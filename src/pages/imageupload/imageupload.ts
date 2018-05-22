import { Component, OnInit, Input, Output, ViewChild, ElementRef } from '@angular/core';
import {FileServiceProvider} from '../../providers/file-service/file-service'
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {HttpErrorResponse, HttpEventType} from "@angular/common/http";
import {environment} from '../../environments/environment'
import { LoadingController, ToastController} from "ionic-angular";
import {FileTransfer, FileUploadOptions, FileTransferObject} from "@ionic-native/file-transfer";
import {Camera, CameraOptions} from "@ionic-native/camera";

@IonicPage()
@Component({
  selector: 'page-imageupload',
  templateUrl: 'imageupload.html',
  providers: [FileServiceProvider]
})
export class ImageuploadPage implements OnInit{

  imageURI: any;
  activityImageSrc: string;

  imageId: string;
  spinner: string;
  addImage: string;

  @ViewChild('fileImage') fileImage: ElementRef;
  loaded: boolean;

  constructor(public navCtrl: NavController, public navParams: NavParams,
              private fileService: FileServiceProvider, private transfer: FileTransfer,
              private  camera: Camera, public loadingCtrl: LoadingController,
              public toastCtrl: ToastController) {
    this.spinner = '../../../assets/img/spinner.gif';
    this.addImage = environment.urlBackend + '/files/addfile.png';
    this.activityImageSrc = this.addImage;
  }
  ngOnInit() {
  }

  reset() {
    this.imageId = null;
    this.activityImageSrc = this.addImage;
    this.loaded = false;
  }

  openFileDialog() {
    if (!this.loaded) {
      this.fileImage.nativeElement.click();
    }
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad ImageuploadPage');
  }

  uploadFile() {
    let loader = this.loadingCtrl.create({
      content: "Uploading..."
    });
    loader.present();
    const fileTransfer: FileTransferObject = this.transfer.create();

    let options: FileUploadOptions = {
      fileKey: 'ionicfile',
      fileName: 'ionicfile',
      chunkedMode: false,
      mimeType: "image/jpeg",
      headers: {}
    }

    fileTransfer.upload(this.imageURI, 'http://192.168.0.7:8080/api/uploadImage', options)
      .then((data) => {
        console.log(data+" Uploaded Successfully");
        this.activityImageSrc = environment.urlBackend + '/files/' + event['dir'];
        loader.dismiss();

      }, (err) => {
        console.log(err);
        loader.dismiss();

      });
  }



  getImage() {
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.FILE_URI,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
    }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURI = imageData;
    }, (err) => {
      console.log(err);

    });
  }
  presentToast(msg) {
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 3000,
      position: 'bottom'
    });

    toast.onDidDismiss(() => {
      console.log('Dismissed toast');
    });

    toast.present();
  }

}
