import { Component, OnInit } from '@angular/core';
import { Platform, ActionSheetController } from '@ionic/angular';
import { Camera, CameraOptions } from '@ionic-native/camera/ngx';
import { ActivatedRoute } from '@angular/router';
import { SessionService } from '../session/session.service';

@Component({
    selector: 'app-project-edit',
    templateUrl: './project-edit.page.html',
    styleUrls: ['./project-edit.page.scss'],
})
export class ProjectEditPage implements OnInit {
    project_id = '';
    project: any = {};
    constructor(
        private platform: Platform,
        private camera: Camera,
        private actionSheetController: ActionSheetController,
        private route: ActivatedRoute,
        private session: SessionService
    ) { }
    ngOnInit() {
        this.project_id = this.route.snapshot.paramMap.get('project_id');
        this.loadData();
    }
    loadData() {
        this.session.ajax(this.session.api + "project-get-once.php", {
            project_id: this.project_id
        }, true).then((res: any) => {
            if (res.status == true) {
                this.project = res.project;
            } else {
                this.session.showAlert(res.message).then(rs => {
                    this.session.back();
                });
            }
        }).catch(error => {
            this.session.showAlert(error);
        });
    }
    edit() {
        this.project.user_id = this.session.user.user_id;
        this.session.ajax(this.session.api + "project-edit.php", this.project, true).then((res: any) => {
            if (res.status == true) {
                this.session.back();
            } else {
                this.session.showAlert(res.message);
            }
        }).catch(error => {
            this.session.showAlert(error);
        });
    }
    async selectImage() {
        if (this.platform.is("cordova")) {
            const actionSheet = await this.actionSheetController.create({
                header: 'เลือกรูปภาพ',
                buttons: [
                    {
                        text: 'เลือกจากอัลบัม',
                        icon: 'images',
                        handler: () => {
                            this.addCamera(1);
                        }
                    },
                    {
                        text: 'ถ่ายรูป',
                        icon: 'camera',
                        handler: () => {
                            this.addCamera(0);
                        }
                    },
                ]
            });
            await actionSheet.present();
        } else {
            let input: any = null;
            input = document.createElement("input");
            input.setAttribute("type", "file");
            input.setAttribute("accept", ".jpg, .jpeg, .png, .gif");
            input.addEventListener('change', (event: any) => {
                let target: any = event.target;
                let reader: any = new FileReader();
                reader.onload = (e: any) => {
                    let fileBase64: any = e.target.result;
                    this.uploadImageBase64(fileBase64);
                };
                reader.readAsDataURL(target.files[0]);
            });
            input.click();
        }
    }
    addCamera(index) {
        let sourceType;
        let allowEdit;
        if (index == 0) { // Camera
            sourceType = this.camera.PictureSourceType.CAMERA;
            allowEdit = true;
        }
        if (index == 1) { // Album
            sourceType = this.camera.PictureSourceType.SAVEDPHOTOALBUM;
            allowEdit = false;
        }
        const options: CameraOptions = {
            destinationType: this.camera.DestinationType.DATA_URL,
            sourceType: sourceType,
            allowEdit: allowEdit,
            encodingType: this.camera.EncodingType.JPEG,
            mediaType: this.camera.MediaType.PICTURE,
            correctOrientation: true,
        }
        this.camera.getPicture(options).then((imageData) => {
            let base64Image = 'data:image/jpeg;base64,' + imageData;
            this.uploadImageBase64(base64Image);
        }, (err) => {
        });
    }
    uploadImageBase64(fileBase64: any) {
        this.session.ajax(this.session.api + 'file-upload-tmp.php', {
            base64: fileBase64,
            filename: this.project.project_image
        }, true).then((res: any) => {
            if (res.status) {
                this.project.project_image = res.filename;
            } else {
                this.session.showAlert(res.message);
            }
        }).catch(error => {
            this.session.showAlert(error);
        });
    }
    validate() {
        if (!this.project.project_name) return false;
        if (!this.project.project_detail) return false;
        if (!this.project.project_date) return false;
        if (!this.project.project_amount) return false;
        if (!this.project.project_image) return false;
        return true;
    }
    ngOnDestroy() {
        if (this.project.project_image == '') return;
        this.session.ajax(this.session.api + 'file-remove-tmp.php', {
            filename: this.project.project_image
        }, false);
    }
}
