import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Chat} from "../../models/chat/chat";
import {Message} from "../../models/chat/message"
import * as io from 'socket.io-client';
import {messageTypes} from "../../configs/enums_chat";

/*
  Generated class for the ChatServiceProvider provider.

  See https://angular.io/guide/dependency-injection for more info on providers
  and Angular DI.
*/
const url = 'chats';
@Injectable()
export class ChatServiceProvider {

  userChats = new BehaviorSubject(null);
  currentChat = new BehaviorSubject(null);
  newMessage = new BehaviorSubject(null);
  socket;
  private url = 'http://localhost:8880';
  constructor(public http: HttpClient) {
    console.log('Hello ChatServiceProvider Provider');
  }
  /* CREATE A SOCKET CONNECTION */
  socketConnect() {
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
    return this.http.get<any>(url+'/' + id);
  }
  /* GET A PARTICULAR CHAT*/
  public getUserChat(chatId): Observable<Chat> {
    const id = localStorage.getItem('userId');
    return this.http.get<any>(url + '/' + chatId + '/' + id);
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
    const id = localStorage.getItem('userId');
    const messageToSend = new Message(id, message, new Date(), false);
    this.newMessage.next(messageToSend);
    return message;
  }

}
