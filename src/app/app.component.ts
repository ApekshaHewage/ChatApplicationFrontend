import {Component, OnInit} from '@angular/core';
import Pusher from 'pusher-js';
import {HttpClient} from "@angular/common/http";

interface Message {
  username: string;
  message: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  username: string = 'username';
  message: string = '';
  messages: Message[] = [];

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    Pusher.logToConsole = true;

    const pusher = new Pusher('0dfefde6cad8d4ba5449', { 
      cluster: 'ap2'
    });

    const channel = pusher.subscribe('chat');
    channel.bind('message', (data: any) =>  {
      this.messages.push(data)
    });
  }

  submit(): void {
    this.http.post('http://localhost:8000/api/messages', {
      username: this.username,
      message: this.message
    }).subscribe(() => this.message = '');
  }
}