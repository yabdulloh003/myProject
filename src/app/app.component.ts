import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { SessionService } from './session/session.service';

@Component({
    selector: 'app-root',
    templateUrl: 'app.component.html',
    styleUrls: ['app.component.scss']
})
export class AppComponent {
    constructor(
        private platform: Platform,
        private splashScreen: SplashScreen,
        private statusBar: StatusBar,
        private session: SessionService
    ) {
        this.initializeApp();
    }
    initializeApp() {
        this.platform.ready().then(async () => {
            this.statusBar.styleDefault();
            this.splashScreen.hide();

            this.session.linkTo("/");
            let api = await this.session.getStorage("api");
            if (api) this.session.api = api;
            this.session.ajax(this.session.api + 'check-project-api.php', {}, false).then(async (res: any) => {
                if (res.status) {
                    await this.session.setStorage("api", this.session.api);
                    this.run();
                } else {
                    this.session.linkTo("/set-api", false);
                }
            }).catch(error => {
                this.session.linkTo("/set-api", false);
            });
        });
    }
    async run() {
        this.session.status = await this.session.getStorage('project-status') || false;
        this.session.user = await this.session.getStorage('project-user') || {};
        if (this.session.status == false) {
            this.session.linkTo("/login", false);
        } else {
            this.session.setupPush(); // ทำการลงทะเบียน Push สำหรับรับข้อความแจ้งเตือน
            this.session.linkTo("/tabs/home", false);
        }
    }

}
