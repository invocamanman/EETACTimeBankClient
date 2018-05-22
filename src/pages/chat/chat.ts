import {Component} from '@angular/core';
import {IonicPage, NavController, NavParams} from 'ionic-angular';
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {MessagesPage} from "../messages/messages";

/**
 * Generated class for the ChatPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-chat',
  templateUrl: 'chat.html',
})
export class ChatPage {
  messages = [
    {
      text: "hola",
      userId: "5b0186059856392360b11de1"
    },
    {
      text: "ciao",
      userId: "5b0186059856392360b11de2"
    },
    {
      text: "como estas?",
      userId: "5b0186059856392360b11de1"
    },

    {
      text: "molto benne!",
      userId: "5b0186059856392360b11de2"
    },
  ];
  userChats = [
    {
      id: "5b0186059856392360b11de1",
      lastMessage: "que tal el finde?",
      newMessages: 0,
      userAvatar: "https://pbs.twimg.com/profile_images/965772032397987840/khi8fehb_400x400.jpg",
      userId: "5b0159f96eabea0ed00eac91",
      userName: "Maria"
    },
    {
      id: "5b0186059856392360b11de1",
      lastMessage: "nos vemos mañana?",
      newMessages: 0,
      userAvatar: "http://scriboeditorial.com/wp-content/uploads/2015/03/sa_1425548456Mi%20chica%20ideal-583x583.jpg",
      userId: "5b0159f96eabea0ed00eac91",
      userName: "Ruth"
    },
    {
      id: "5b0186059856392360b11de1",
      lastMessage: "Hoy he dormido fatal, porque he tenido que domir fuera de casa",
      newMessages: 0,
      userAvatar: "https://coo.tuvotacion.com/imagenes_opciones/cual-chico-de-cnco-es-mas-guapo-1791440.jpg",
      userId: "5b0159f96eabea0ed00eac91",
      userName: "Alex"
    }
  ];
  currentChat;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ChatServiceProvider: ChatServiceProvider) {
  }

  ionViewDidLoad() {
    /*RECEIVE THE USERSCHATS FROM SERVER*/
    this.ChatServiceProvider.getUserChats().subscribe(userChats => {
      this.ChatServiceProvider.userChats.next(userChats);
      console.log(userChats);
    });
    /*UPDATE THE USERSCHATS FROM SERVICE*/
    this.ChatServiceProvider.userChats.subscribe(userChats => {
      this.userChats = userChats;
    });
    /*UPDATE THE CURRENT CHAT FROM SERVICE*/
    this.ChatServiceProvider.currentChat.subscribe(currentChat => {
      this.currentChat = currentChat;
    });
  }
  /*CHECK IF THERE ARE NEWMESSAGES*/
  hasNewMessages(chat) {
    return !!chat.newMessages;
  }
  /*SET THE CURRENT CHAT*/
  onUserClick(chatId) {
    console.log(chatId);
    this.ChatServiceProvider.setCurrentChat(chatId);
    this.navCtrl.push(MessagesPage);
  }
}
