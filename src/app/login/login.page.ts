import { Component, OnInit } from '@angular/core';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
    user: any = {
        username: 'srikee',
        password: '1234'
    };
    constructor(
        private session: SessionService
    ) { }
    ngOnInit() {
    }
    login() {
        this.session.ajax(this.session.api + "login.php", {
            username: this.user.username,
            password: this.user.password,
        }, true).then((res: any) => {
            if (res.status == true) {
                this.session.status = true;
                this.session.user = res.user;
                this.session.setStorage('project-status', true);
                this.session.setStorage('project-user', res.user);
                this.session.linkTo("/tabs/home", false);
            } else {
                this.session.showAlert(res.message);
            }
        }).catch(error => {
            this.session.showAlert(error);
        });
    }
    reset() {
        this.user = {};
    }
}
