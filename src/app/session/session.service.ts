import { Injectable } from '@angular/core';
import { LoadingController, AlertController, ToastController, Platform, NavController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';
import { timeout } from 'rxjs/operators';
import { Storage } from '@ionic/storage';
import { OneSignal } from '@ionic-native/onesignal/ngx';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class SessionService {
    public status = false;  // ตัวแปรควบคุมการล็อกอิน  // true : ล็อกอินแล้ว , false: ยังไม่ล็อกอิน
    public user: any = {};
    public api = "http://localhost/projectAppApi/";     // ตัวแปรสำหรับชี้ที่ตั้งของ Api
    public apiTimeout: number = 5000;
    constructor(
        private http: HttpClient,
        private loadingCtrl: LoadingController,
        private alertCtrl: AlertController,
        private toastController: ToastController,
        private storage: Storage,
        private platform: Platform,
        private router: Router,
        private nav: NavController,
        private oneSignal: OneSignal,
    ) { }
    public async ajax(url, data, isloading) {   // method สำหรับการเชือมต่อเรียก Api Service
        let loading: any;
        if (isloading == true) {
            loading = await this.loadingCtrl.create({
                message: "กำลังประมวลผล",
            });
            await loading.present();
        }
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                this.http.post(url, JSON.stringify(data), { responseType: 'text' })
                    .pipe(
                        timeout(this.apiTimeout)
                    )
                    .subscribe((response: any) => {
                        if (isloading == true) { loading.dismiss(); }
                        try {
                            var rs = JSON.parse(response);
                            resolve(rs);
                        } catch (e) {
                            reject(response);
                        }
                    }, error => {
                        if (isloading == true) { loading.dismiss(); }
                        reject("ไม่สามารถติดต่อเครื่องแม่ข่ายได้");
                    });
            }, 200);
        });
    }
    public showAlert(message) {     // method สำหรับการแสดง Alert ข้อมูล
        let msg: any = message;
        if (typeof message === 'object') msg = JSON.stringify(message);
        if (typeof message === 'string') msg = message;
        return new Promise(async resolve => {
            const alert = await this.alertCtrl.create({
                header: "แจ้งข้อความ",
                message: msg,
                backdropDismiss: false,
                buttons: [
                    {
                        text: "ตกลง",
                        handler: () => {
                            resolve(true);
                        }
                    },
                ]
            });
            await alert.present();
        });
    }
    public showConfirm(message) {   // method สำหรับการแสดงการยืนยันข้อมูล
        let msg: any = message;
        if (typeof message === 'object') msg = JSON.stringify(message);
        if (typeof message === 'string') msg = message;
        return new Promise(async resolve => {
            let alert = await this.alertCtrl.create({
                header: "คำยืนยัน ?",
                message: msg,
                backdropDismiss: false,
                buttons: [
                    {
                        text: "ยกเลิก",
                        role: 'cancel',
                        handler: () => {
                            resolve(false);
                        }
                    },
                    {
                        text: "ตกลง",
                        handler: () => {
                            resolve(true);
                        }
                    }
                ]
            });
            await alert.present();
        });
    }
    public async showToast(message, duration = 2000) {  // method สำหรับการแสดง Toast ข้อมูล
        const toast = await this.toastController.create({
            color: 'dark',
            message: message,
            duration: duration,
            mode: 'ios',
            showCloseButton: true,
            closeButtonText: "ปิด"
        });
        toast.present();
    }
    public getStorage(key) {        // method สำหรับดึงข้อมูลจาก Storage
        return this.storage.get(key);
    }
    public setStorage(key, val) {   // method สำหรับการ set ข้อมูล Storage
        return this.storage.set(key, val);
    }
    public removeStorage(key) {     // method สำหรับลบข้อมูล Storage
        return this.storage.remove(key);
    }
    public linkTo(page, type = true) { // type=false ไม่จำ/ true=จำ
        if (type == false) {
            this.router.navigateByUrl(page, { replaceUrl: true }); // ไม่จำประวัติหน้าก่อนหน้า
        } else {
            this.router.navigateByUrl(page);  // จำประวัติหน้าก่อนหน้า
        }
    }
    public back() { // ฟังก์ชันสำหรับถอยไปยังหน้าก่อนหน้า
        this.nav.pop();
    }
    public setupPush() {
        if (this.platform.is('cordova')) {
            this.oneSignal.startInit('b45df6e2-d5e8-4973-915d-d07d0d729ac5', '1001193091045');  //เอาจาก onesignal and firebese
            this.oneSignal.inFocusDisplaying(this.oneSignal.OSInFocusDisplayOption.InAppAlert);
            this.oneSignal.handleNotificationReceived().subscribe((jsonData) => {
                let msg = "handleNotificationReceived<br>" + JSON.stringify(jsonData);
                this.showAlert(msg);    //เมื่อได้รับข้อความให้มันแจ้งเตือน alert
            });
            this.oneSignal.handleNotificationOpened().subscribe((jsonData) => {
                let msg = "handleNotificationOpened<br>" + JSON.stringify(jsonData);
                this.showAlert(msg);
            });
            this.oneSignal.getIds().then((ids) => {
                alert(ids.userId);
                // this.ajax("", {
                //     user_id: this.user.user_id,
                //     player_id: ids.userId
                // }, false);
            });
            this.oneSignal.endInit();
        } else {
            this.showAlert('ไม่รองรับ push บนบราวเซอร์');
        }
    }
}
