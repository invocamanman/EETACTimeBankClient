import { Component, ViewChild, NgZone } from '@angular/core';
import { IonicPage, NavController, NavParams, Content } from 'ionic-angular';
import {ChatServiceProvider} from "../../providers/chat-service/chat-service";
import {messageTypes} from "../../configs/enums_chat";
import {Chat} from "../../models/chat/chat";

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
  conversation: Chat = {
    _id: null,
    users: [],
    messages: [],
  };
  zone;
  message;
  finalMessagesReached;
  constructor(public navCtrl: NavController, public navParams: NavParams,public ChatServiceProvider:ChatServiceProvider) {
  }

  ionViewWillEnter(): void {
    this.scrollToBottom();
  }

  scrollToBottom() {
    this.content && this.content.scrollToBottom();
  }

  getMessages(currentChatId, offset, limit, callback) {
    this.ChatServiceProvider.getChatMessages(currentChatId, offset, limit).subscribe(({ messages }) => {
      this.zone.run(() => {
        this.conversation.messages = [...messages, ...this.conversation.messages];
      });

      if (messages.length < limit) {
        this.finalMessagesReached = true;
      }
      callback && callback(this);
    });
  }

  getUsers(currentChatId) {
    this.ChatServiceProvider.getChatUsers(currentChatId).subscribe((users) => {
      this.conversation.users = users;
      this.assignPhotos();
    });
  }

  ionViewDidLoad() {
    debugger;
    this.ChatServiceProvider.socketConnect();
    debugger;
    this.ChatServiceProvider.currentChat.subscribe(async (currentChatId) => {
      this.currentChatId = currentChatId;
      if (currentChatId) {
        this.conversation._id = currentChatId;
        await this.getUsers(currentChatId);
        await this.getMessages(currentChatId, 0, 10, context => {
          debugger;
          return context.scrollToBottom()
        });
      }


    });
    this.zone = new NgZone({});
    this.ChatServiceProvider.newMessage.subscribe((message) => {
      debugger;
      if (message) {
        if (this.conversation) {
          this.conversation.messages.push(message);
          const frameTosend = {'chatId': this.currentChatId, message};
          debugger;
          this.ChatServiceProvider.sendMessageSocket(messageTypes.NEW_MESSAGE, frameTosend);
          const userChats = this.ChatServiceProvider.userChats.value;
          const chats = userChats.map(chat => {
              if (chat.id === this.currentChatId) {
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

    this.content.ionScrollEnd.subscribe((target) => {
      const scrolledToTheTop = target && target.scrollTop === 0;
      if (scrolledToTheTop && !this.finalMessagesReached) {
        this.getMessages(this.currentChatId, this.conversation.messages.length, 10, null);
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
