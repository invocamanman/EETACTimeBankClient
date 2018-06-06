import { Component, ViewChild } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {messageTypes} from "../../configs/enums_chat";

@IonicPage()
@Component({
  selector: 'page-messages',
  templateUrl: 'messages.html',
})
export class MessagesPage {
  @ViewChild(Content) content: Content;
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

  ionViewWillEnter(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    setTimeout(() => {
      this.content.scrollToBottom();
    });
  }

  ionViewDidLoad() {

    this.ChatServiceProvider.socketConnect();
    this.ChatServiceProvider.currentChat.subscribe((currentChatId) => {
      this.currentChatId = currentChatId;
    });
    if (this.currentChatId) {
      this.ChatServiceProvider.getUserChat(this.currentChatId).subscribe((chat) => {
        this.conversation = chat;
        this.assignPhotos();
      })
    }
    this.ChatServiceProvider.newMessage.subscribe((message) => {
      debugger;
      if (message) {
        debugger;
          if (this.conversation) {
          this.conversation.messages.push(message);
          const frameTosend = {'chatId': this.currentChatId, message};
          this.ChatServiceProvider.sendMessageSocket(messageTypes.NEW_MESSAGE, frameTosend);
          const userChats = this.ChatServiceProvider.userChats.value;
          const chats = userChats.map(chat => {
              if (chat.id === this.currentChatId) {
              console.log('trobat afegeixo el missatge:' + message.text);
              return {...chat, lastMessage: message.text};
            } else {
              return chat;
            }
          });
          this.ChatServiceProvider.userChats.next(chats);
        }

      }
    });
    this.ChatServiceProvider.getPrivateMessage().subscribe(privateMessage => {
      debugger;
      if (privateMessage) {
          if (privateMessage.chatId === this.currentChatId) {
          this.conversation.messages.push(privateMessage.message);
        }
          else{
            const userChats = this.ChatServiceProvider.userChats.value;
            const chats = userChats.map(chat => {
              if (chat.id === privateMessage.chatId) {
                if (chat.userId === privateMessage.message.userFrom) {
                  return {...chat, lastMessage: privateMessage.message.text, newMessages: chat.newMessages + 1};
                }
                else { /*IS FROM THE USER*/
                  return {...chat, lastMessage: privateMessage.message.text}; }
              }
              else {
                return chat;
              }
            });
            this.ChatServiceProvider.userChats.next(chats);
          }
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
    console.log(this.currentChatId);
    return this.currentChatId;
  }
  sendTheMessage(){
    console.log(this.message);
    this.ChatServiceProvider.sendMessage(this.message);
    this.message = null;
    this.scrollToBottom();
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
