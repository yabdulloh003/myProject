import { Component, OnInit } from '@angular/core';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { BarcodeScanner } from '@ionic-native/barcode-scanner/ngx';
import { InAppBrowser } from '@ionic-native/in-app-browser/ngx';
import { CallNumber } from '@ionic-native/call-number/ngx';
import { FingerprintAIO } from '@ionic-native/fingerprint-aio/ngx';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.page.html',
    styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
    constructor(
        private camera: Camera,
        private barcodeScanner: BarcodeScanner,
        private iab: InAppBrowser,
        private callNumber: CallNumber,
        private faio: FingerprintAIO,
        private geolocation: Geolocation,
        private session: SessionService
    ) { }
    ngOnInit() {
    }
    openCamera() {
        const options: CameraOptions = {
            quality: 100,
            destinationType: this.camera.DestinationType.FILE_URI,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE
        }
        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.session.showAlert(base64Image);
        }, (err) => {
            this.session.showAlert(err);
        });
    }
    openScan() {
        this.barcodeScanner.scan().then(barcodeData => {
            this.session.showAlert(barcodeData);
        }).catch(err => {
            this.session.showAlert(err);
        });
    }
    openInappbrowser() {
        let url = "https://www.yru.ac.th/th/";
        this.iab.create(url);
    }
    openCall() {
        let number = "0910451096";
        this.callNumber.callNumber(number, true).then(res => {
            this.session.showAlert(res);
        }).catch(err => {
            this.session.showAlert(err);
        });
    }
    openFingerprint() {
        this.faio.show({
            clientId: 'Fingerprint-Demo', //Android: Used for encryption. iOS: used for dialogue if no `localizedReason` is given.
            clientSecret: 'o7aoOMYUbyxaD23oFAnJ', //Necessary for Android encrpytion of keys. Use random secret key.
            disableBackup: true,  //Only for Android(optional)
            localizedFallbackTitle: 'Use Pin', //Only for iOS
            localizedReason: 'Please authenticate' //Only for iOS
        }).then((result: any) => {
            this.session.showAlert(result);
        }).catch((error: any) => {
            this.session.showAlert(error);
        });
    }
    openGps() {
        this.geolocation.getCurrentPosition().then((resp) => {
            let msg = 'latitude : ' + resp.coords.latitude + '<br>longitude : ' + resp.coords.longitude;
            this.session.showAlert(msg);
        }).catch((error) => {
            this.session.showAlert(error);
        });

        // let watch = this.geolocation.watchPosition();
        // watch.subscribe((data) => {
        //     this.session.showAlert(data);
        // });
    }
}
