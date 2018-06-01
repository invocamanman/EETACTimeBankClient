import { Component, ViewChild } from '@angular/core';
import { IonicPage, Nav, NavController, NavParams } from 'ionic-angular';
import { UserServiceProvider } from "../../providers/user-service/user-service";
import { SignInProvider } from "../../providers/sign-in/sign-in";
import { ToastController } from 'ionic-angular';
import { Events } from 'ionic-angular';
import { Facebook, FacebookLoginResponse } from '@ionic-native/facebook';
/**
 * Generated class for the SigninPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'signin'
})
@Component({
  selector: 'page-signin',
  templateUrl: 'signin.html',
  providers: [UserServiceProvider],
})
export class SigninPage {


  constructor(public navCtrl: NavController, public navParams: NavParams,
    private userService: UserServiceProvider,
    public toastCtrl: ToastController, public events: Events,
    private fb: Facebook, private signInProvider: SignInProvider) {

  }


  signIn(username: string, password: string) {
    this.userService.signIn$(username, password).subscribe(
      data => {
        console.log(data);
        localStorage.setItem('userId', data.userId);
        localStorage.setItem('token', data.token);
        localStorage.setItem('username', data.username);
        this.navCtrl.setRoot('mainpage');
        this.events.publish('user:created', data.username, data.foto);
        //cosa imagen
        let toast = this.toastCtrl.create({
          message: 'User was login successfully :D' + data.userId,
          duration: 3000
        });
        toast.present();
      },
      data => {
        console.log(data);
        let toast = this.toastCtrl.create({
          message: 'NOOOOOOOO' + data,
          duration: 3000
        });
        toast.present();
      });
  }

  signInFace() {
    this.fb.login(['public_profile'])
      .then((res: FacebookLoginResponse) => {
        this.signInProvider.signInFace(res).subscribe(
          data => {
            console.log(data);
            localStorage.setItem('userId', data.userId);
            localStorage.setItem('token', data.token);
            localStorage.setItem('username', data.username);
            this.navCtrl.setRoot('mainpage');
            this.events.publish('user:created', data.username, data.foto);
            //cosa imagen
            let toast = this.toastCtrl.create({
              message: 'User was login successfully :D' + data.userId,
              duration: 3000
            });
            toast.present();
          }, err => {
            console.log(err);
            let toast = this.toastCtrl.create({
              message: 'NOOOOOOOO' + err,
              duration: 3000
            });
            toast.present();
          });

      })
      .catch(e => console.log('Error logging into Facebook', e));

  }


  goToRegister() {
    // go to the signin
    this.navCtrl.push('register');

  }
  goToMainpage() {
    //this.navCtrl.push('mainpage');
    this.navCtrl.setRoot('mainpage')
  }

}
