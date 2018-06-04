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
  userChats;
  currentChat;
  currentChatId;

  constructor(public navCtrl: NavController, public navParams: NavParams, public ChatServiceProvider: ChatServiceProvider) {
  }

  ionViewDidLoad() {
    this.ChatServiceProvider.socketConnect();
    /*RECEIVE THE USERSCHATS FROM SERVER*/
    this.ChatServiceProvider.getUserChats().subscribe(userChats => {
      this.ChatServiceProvider.userChats.next(userChats);
      console.log(userChats);
    });
    /*RECEIVE THE CURRENT CHATID*/
    this.ChatServiceProvider.currentChat.subscribe((currentChatId) => {
      this.currentChatId = currentChatId;
    });
    /*UPDATE THE USERSCHATS FROM SERVICE*/
    this.ChatServiceProvider.userChats.subscribe(userChats => {
      this.userChats = userChats;
    });
    /*UPDATE THE CURRENT CHAT FROM SERVICE*/
    this.ChatServiceProvider.currentChat.subscribe(currentChat => {
      this.currentChat = currentChat;
    });
    /*RECEIVE A NEW MESSAGE*/
    this.ChatServiceProvider.getPrivateMessage().subscribe(privateMessage => {
      debugger;
      if (privateMessage) {
        const ChatsActuals = this.ChatServiceProvider.userChats.value;
        const mychats = ChatsActuals.map(chat => {
          if (chat.id === privateMessage.chatId) {
            if (privateMessage.message.userFrom === localStorage.getItem('userId')) {
              return {...chat, lastMessage: privateMessage.message.text};
            }
            else {
              return {...chat, lastMessage: privateMessage.message.text, newMessages: chat.newMessages + 1};
            }
          }
          else {
            return chat;
          }
        });
        this.ChatServiceProvider.userChats.next(mychats);

      }
    });
  }
  /*CHECK IF THERE ARE NEWMESSAGES*/
  hasNewMessages(chat) {
    return !!chat.newMessages;
  }
  /*SET THE CURRENT CHAT*/
  onUserClick(chatId) {
    console.log(chatId);
    this.ChatServiceProvider.setCurrentChat(chatId); //seleccionem el chat
    this.navCtrl.push(MessagesPage);
  }
}
