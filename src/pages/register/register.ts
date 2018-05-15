import { Component } from '@angular/core';
import {IonicPage, NavController, NavParams, ToastController} from 'ionic-angular';
import {UserServiceProvider} from "../../providers/user-service/user-service";

/**
 * Generated class for the RegisterPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage({
  name: 'register'
})
@Component({
  selector: 'page-register',
  templateUrl: 'register.html',
  providers: [UserServiceProvider],
})
export class RegisterPage {

  constructor(public navCtrl: NavController, public navParams: NavParams, private userService: UserServiceProvider,public toastCtrl: ToastController) {
  }

  goToSignin(){
    // go to the signin
    this.navCtrl.push('signin');
  }

  signUp(name:string, username:string, mail:string, password: string, password2: string ){

    if (password != password2) {
      console.log("no coinciden");
      //this.showErrorToast("Passwords doesn't match");
    }
    else {
      const userData = { name, username, mail, password };
      this.userService.signUp$(userData).subscribe(
        data => {
          //this.userService.setUserLoggedIn();
          console.log('User '+username+' added!');
          localStorage.setItem('userId', data.userId);
          localStorage.setItem('token', data.token);
          let toast = this.toastCtrl.create({
            message: 'The user '+ username + 'was registered successfully :D',
            duration: 3000
          });
          toast.present();
          //this.router.navigate(['home']);
        },
        data => {
          console.log(data.error.dbError);
          if (data.error.dbError === 'Duplicated')
          {
            console.log("ESE NOMBRE NOOO")
          }
          else {
            switch (data.error.validationError) {
              case 'mail':
                console.log('Invalid email format'); //Joi Validation failed
                break;
              case 'name':
                console.log('Invalid name format');
                break;
              case 'username':
                console.log('Invalid username format');
                break;
              case 'password':
                console.log('Invalid password format');
                break;
            }
          }
        });
    }

  }

}
