import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams } from 'ionic-angular';
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";

/**
 * Generated class for the MessagesPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
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
  myPhoto;
  oppositePhoto;
  messages;
  currentChatId;
  conversation;
  message;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ChatServiceProvider:ChatServiceProvider) {
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MessagesPage');
    this.ChatServiceProvider.currentChat.subscribe((currentChatId) => {
      this.currentChatId = currentChatId;
  })
    if(this.currentChatId){
      this.ChatServiceProvider.getUserChat(this.currentChatId).subscribe((chat) =>{
      this.conversation = chat;
      this.assignPhotos(); }  )
    }
    this.ChatServiceProvider.newMessage.subscribe((message) => {
      if (message) {
        console.log(this.message);
        const frameTosend = { 'chatId': this.currentChatId, message };
        //this.userChatService.sendMessageSocket(messageTypes.NEW_MESSAGE, frameTosend);
        this.conversation.messages.push(message);

      }
    });

  }
  /*CHECK IF IS THE USER*/
  isTheUser(Object){
    const id = localStorage.getItem('userId');
    if (Object.userFrom === id) {
      return true;
    }
    return false;
  }
  isChatDefined(){
    return this.currentChatId;

  }
  sendTheMessage(){
    console.log(this.message);
    this.ChatServiceProvider.sendMessage(this.message);
    this.message="";

  }
  private assignPhotos() {
    const id = localStorage.getItem('userId');
    if (this.conversation.users[0].userId === id) {
      this.myPhoto = this.conversation.users[0].userAvatar;
      this.oppositePhoto = this.conversation.users[1].userAvatar;
    } else {
      this.oppositePhoto = this.conversation.users[0].userAvatar;
      this.myPhoto = this.conversation.users[1].userAvatar;
    }
  }

}
