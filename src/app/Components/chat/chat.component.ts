import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/Entities/message';
import { AuthenticationService } from 'src/app/Services/Authentication/authentication.service';
import { FirestoreService } from 'src/app/Services/FireStore/firestore.service';

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
  isLogged: boolean;
  openChat: boolean;
  chatMessages: any[];
  newMessage: Message;
  inputMessage: string;
  dateToday: string

  constructor(
    public _authService: AuthenticationService,
    public fireStoreService: FirestoreService
  ) {
    this.isLogged = false;
    this.openChat = false;
    this.chatMessages = [];
    this.dateToday = new Date().toString();
    this.newMessage = new Message("", "", this.dateToday);
    this.inputMessage = "";
  }

  ngOnInit(): void {
    this._authService.getIsLogged().subscribe((res) => {
      this.isLogged = res;
    });
    this.fireStoreService.getCollection("messages", "messageID").subscribe((messages) => {
      this.chatMessages = messages;
      this.chatMessages = this.chatMessages.sort((a, b) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime());
    })
  }

  sendMessage() {
    this.newMessage = new Message(this._authService.user, this.inputMessage, this.dateToday);
    this.chatMessages.push(this.newMessage);
    this.inputMessage = "";
    this.fireStoreService.addToChat(this.newMessage, this.chatMessages.length);
  }
}