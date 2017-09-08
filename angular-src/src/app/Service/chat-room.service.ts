import { Injectable } from '@angular/core';
import { Socket } from 'ng-socket-io';

@Injectable()
export class ChatRoomService {

  constructor(private socket: Socket) {
  }

  sendMessage(message,user){
    var messageBody = {
      message : message,
      user : user
    }
    this.socket.emit('add-message', messageBody);
  }

  getMessages() {
    return this.socket
      .fromEvent("message")
      .map( data => data );
  }

  getOnlineUsers(){
    this.socket.emit('get_online_users', 'hi');
  }

  removeUserName(userName){
    this.socket.emit('reset_user_list', userName);
  }

  userTyping(className,userName){
    var body = {
      className:className,
      userName:userName
    }
    this.socket.emit('user_Typing', body);
  }

  getUserTyping(){
    return this.socket
      .fromEvent("get_User_Typing")
      .map( data => data );
  }

  stopTyping(className,userName){
    var body = {
      className:className,
      userName:userName
    }
    this.socket.emit('stop_Typing', body);
  }

  stopUserTyping(){
    return this.socket
      .fromEvent("stop_User_Typing")
      .map( data => data );
  }

  getTotalConnectedUser() {
    return this.socket
      .fromEvent("added_one_more")
      .map( data => data );
  }

  setUserName(user){
    this.socket.emit('add-user', user);
  }

  joinPrivate(userToJoin,currentUser){
    var connectedUser = {
      userToJoin:userToJoin,
      currentUser:currentUser
    }
    this.socket.emit('join_private_group', connectedUser);
  }

  sendPrivateMessage(message,receiverUser,senderUser){
    var privateChatBox = {
      message:message,
      receiverUser:receiverUser,
      user:senderUser
    }
    this.socket.emit('send_private_message', privateChatBox);
  }

  getPrivateMessage() {
    return this.socket
      .fromEvent("get_private_message")
      .map( data => data );
  }

  getExceptMessage() {
    return this.socket
      .fromEvent("to_every_except_sender")
      .map( data => data );
  }

}
