import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Chat} from "../../models/chat/chat";
import {Message} from "../../models/chat/message"
import * as io from 'socket.io-client';
import {messageTypes} from "../../configs/enums_chat";
import {MessageFromChat} from "../../models/chat/MessageFromChat";

/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const urlChats = 'chats';
@Injectable()
export class ChatServiceProvider {

  userChats = new BehaviorSubject(null);
  currentChat = new BehaviorSubject(null);
  newMessage = new BehaviorSubject(null);
  socket;
  private url = 'http://localhost:3000';
  constructor(public http: HttpClient) {
    console.log('Hello ChatServiceProvider Provider');
  }
  /* CREATE A SOCKET CONNECTION */
  socketConnect() {
    debugger;
    if (!this.socket) {
      this.socket = io(this.url);
      console.log('nou sockt creat' + this.socket);
      this.sendMessageSocket(messageTypes.NEW_USER, localStorage.getItem('userId'));
      return this.socket;
    }
  }
  /* SEND A MESSAGE VIA SOCKET*/
  sendMessageSocket(messageType, message) {
    this.socket.emit(messageType, JSON.stringify(message));
    console.log(JSON.stringify(message));
  }
  /* GET ALL THE USERCHATS */
  public getUserChats() {
    const id = localStorage.getItem('userId');
    return this.http.get<any>(urlChats+'/' + id);
  }
  /* GET A PARTICULAR CHAT*/
  public getUserChat(chatId): Observable<Chat> {
    const id = localStorage.getItem('userId');
    return this.http.get<any>(urlChats + '/' + chatId + '/' + id);
  }
  /* GET CHAT USERS */
  public getChatUsers(chatId): Observable<any> {
    const id = localStorage.getItem('userId');
    return this.http.get<any>(urlChats + '/users/' + chatId + '/' + id);
  }

  /* GET CHAT MESSAGES */
  public getChatMessages(chatId, offset, limit): Observable<any> {
    const id = localStorage.getItem('userId');
    return this.http.get<any>(urlChats + '/messages/' + chatId + '/' + id, {
        params: {
          offset,
          limit
        },
      }
    );
  }
  /* SET THE CURRENT CHAT CHANGING BY A CLICK AND ACTUALIZE NEW MESSAGES*/
  public setCurrentChat(chatId): BehaviorSubject<Chat> {
    this.currentChat.next(chatId);
    const userChats = this.userChats.value;
    const chats = userChats.map(chat => {
      if (chat.id === chatId) {
        return { ...chat, newMessages: 0 };
      } else {
        return chat;
      }
    });
    this.userChats.next(chats);
    return chatId;
  }
  /*SEND MESSAGE*/
  public sendMessage(message): BehaviorSubject<Chat> {
    const messageDate = new Date();
    const temporaryMessageId = messageDate + 'ID';
    const userFromId = localStorage.getItem('userId');
    const messageToSend = new Message(userFromId, message, messageDate, false, temporaryMessageId);
    this.newMessage.next(messageToSend);
    return message;
  }

  /* GET A NEW MESSAGE*/
  getPrivateMessage() {
    const observable = new Observable<MessageFromChat>(observer => {
      debugger;
      this.socket.on(messageTypes.NEW_MESSAGE, (data) => {
        console.log(data);
        observer.next(data);
      });
      return () => {
        // this.socket.disconnect();
      };
    });
    return observable;
  }
}
