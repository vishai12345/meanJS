import {Component, OnInit, OnDestroy, Renderer, ElementRef, ViewChild} from '@angular/core';
import { ChatRoomService }       from '../Service/chat-room.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit,OnDestroy {

  messages = [];
  connection;
  message:string;
  email:string;
  status:boolean = false;
  totalUser:string;
  userName:string;
  isUserName:boolean = true;
  usertosend:string = null;
  globalMessageBox;
  @ViewChild('fileInput') fileInput:ElementRef;
  constructor(
        private chatService:ChatRoomService,
        private renderer:Renderer,
        private elRef:ElementRef
  ) {}

  sendMessage(){
    if(this.message == '' || this.message == null){
      alert("Write something cool");return;
    }
    if(this.usertosend !== null){
      this.sendPrivateMessage();
      return;
    }
    this.chatService.sendMessage(this.message,this.userName);
    this.message = '';
  }

  setUserName(){
    localStorage.setItem('chatName',JSON.stringify({name:this.userName}));
    this.chatService.setUserName(this.userName);
    this.ngOnInit();
  }

  ngOnInit() {
      var globalMessageBox = JSON.parse(localStorage.getItem('globalMessageBox'));
      if(globalMessageBox !== null){
        this.messages = globalMessageBox;
      }

      var userName = JSON.parse(localStorage.getItem('chatName'));
      if(userName !== null){
        this.isUserName = false;
        this.userName = userName;
      }

      this.chatService.getOnlineUsers();

      this.chatService.getTotalConnectedUser().subscribe(totlaUser => {
          this.totalUser = totlaUser['text'];
      })

      this.connection = this.chatService.getMessages().subscribe(message => {
        this.messages.push(message);
        localStorage.setItem('globalMessageBox',JSON.stringify(this.messages));
        let event = new MouseEvent('click', {bubbles: true});
        //this.fileInput.nativeElement.dispatchEvent(event);
      })

      var user = JSON.parse(localStorage.getItem('currentUser'));
      if(user !== null){
        this.status = true;
      }

      this.chatService.getUserTyping().subscribe(message => {
        var isTyping = this.elRef.nativeElement.querySelector(message['text'].className);
        isTyping.innerHTML = message['text'].userName+' <span style="font-size: 14px;color: red">is typing</span>';
      })

      this.chatService.stopUserTyping().subscribe(message => {
        var isTyping = this.elRef.nativeElement.querySelector(message['text'].className);
        isTyping.innerHTML = message['text'].userName;
      })

      this.chatService.getPrivateMessage().subscribe(message => {
        //console.log(message);
        this.messages.push(message);
        var localPrivateMessageBox = JSON.parse(localStorage.getItem('privateMessageBox'+message['text']['receiverUser']+'_'+message['text']['user']['name']));
        var localPrivateMessageBox1 = JSON.parse(localStorage.getItem('privateMessageBox'+message['text']['user']['name']+'_'+message['text']['receiverUser']));
        if(localPrivateMessageBox !== null){
          localStorage.setItem('privateMessageBox'+message['text']['receiverUser']+'_'+message['text']['user']['name'],JSON.stringify(this.messages));
        }else if(localPrivateMessageBox1 !== null){
          localStorage.setItem('privateMessageBox'+message['text']['user']['name']+'_'+message['text']['receiverUser'],JSON.stringify(this.messages));
        }else if(localPrivateMessageBox === null && localPrivateMessageBox1 === null){
          localStorage.setItem('privateMessageBox'+message['text']['receiverUser']+'_'+message['text']['user']['name'],JSON.stringify(this.messages));
        }
      })

      this.chatService.getExceptMessage().subscribe(message => {
        console.log(message);
      })
  }

  privateChat(name){
    this.doActiveClass(name);
    this.usertosend = name;
    var privateMessageBox = JSON.parse(localStorage.getItem('privateMessageBox'+this.userName['name']+'_'+this.usertosend));
    var privateMessageBox1 = JSON.parse(localStorage.getItem('privateMessageBox'+this.usertosend+'_'+this.userName['name']));
    if(privateMessageBox !== null){
      this.messages = privateMessageBox;
    }else if(privateMessageBox1 !== null){
      this.messages = privateMessageBox1;
    }else{
      this.messages = [];
    }
    this.chatService.joinPrivate(name,this.userName['name']);
  }

  getGlobalMessage(name){
    this.doActiveClass(name);
    var globalMessageBox = JSON.parse(localStorage.getItem('globalMessageBox'));
    this.usertosend = null;
    if(globalMessageBox !== null){
      this.messages = globalMessageBox;
    }else{
      this.messages = [];
    }
  }

  doActiveClass(name){
    var allOnlineUsersElementClass = this.elRef.nativeElement.querySelectorAll('.list-group-item');
    for(var i = 0 ; i < allOnlineUsersElementClass.length ; i++ ){
      var ClassName = allOnlineUsersElementClass[i].className;
      if(ClassName.indexOf('active') >= 0){
        var newClassName = ClassName.replace("active", " ");
      }
      if(newClassName === undefined){
        allOnlineUsersElementClass[i].className = ClassName;
      }else{
        allOnlineUsersElementClass[i].className = newClassName;
        newClassName = undefined;
      }
    }
    var className = '.typing_'+name;
    var selectedElement = this.elRef.nativeElement.querySelector(className);
    var selectedClassName = selectedElement.className;
    if(selectedClassName.indexOf('active') === -1){
      selectedElement.className += " active";
    }
  }

  sendPrivateMessage(){
    this.chatService.sendPrivateMessage(this.message,this.usertosend,this.userName);
    this.message = '';
  }

  userTyping(){
    this.chatService.userTyping('.typing_'+this.userName['name'],this.userName['name']);
  }

  stopTyping(){
    this.chatService.stopTyping('.typing_'+this.userName['name'],this.userName['name']);
  }

  ngOnDestroy() {
    this.connection.unsubscribe();
  }

}
