import { Component, OnInit } from '@angular/core';
// import { Observable } from 'rxjs/Observable';
// import { Message } from '@stomp/stompjs';

// import { Subscription } from 'rxjs/Subscription';
// import { StompService } from '@stomp/ng2-stompjs';

import { StompService } from 'ng2-stomp-service';

import { Payload } from './payload';
import { Player } from './player';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  // CROSS = 'Cross';
  // CIRCLE = 'Cirlce';
  circlePlayer = new Player(1, 'Circle');
  crossPlayer = new Player(2, 'Cross');
  title = 'Tic-Tac-Toe!';
  selectedPlayer: Player;
  subscribed: boolean;
  message: string;

  winner: number;
  board: Array<Array<number>> = [];
  turn: number;
  command: string;

  // public history: Array<any> = [];

  private subscription: any;
  // public messages: Observable<Message>;

  constructor(private stompService: StompService){}

  onSelectPlayer(player: Player): void {
    this.selectedPlayer = player;
    this.subscribe();
  }

  reset(): void {
    this.selectedPlayer = null;
    // this.messages = null;
    this.unsubscribe();
    this.intializeBoard();
    this.winner = null;
    this.turn = null;
    this.command = null;
  }

  send(): void {
    this.stompService.send('/app/chat/', this.getData());
  }

  ngOnInit(): void {
    this.configureStomp();
    this.reset();
  }

  intializeBoard(): void {
    this.board = [];
    this.board.push([0,0,0]);
    this.board.push([0,0,0]);
    this.board.push([0,0,0]);
  }

  configureStomp(): void {
    this.stompService.configure({
      host:'http://192.168.3.97:8080/game',
      debug:true,
      queue:{'init':false},
    });
  }

  subscribe(){
    if(this.subscribed){
      return;
    }

    this.stompService.startConnect().then(() => {
      this.stompService.done('init');
      console.log('connected with WS');
      this.subscription = this.stompService.subscribe('/topic/messages', this.on_next);
      this.subscribed = true;
    });
  }

  ngOnDestroy() {
    this.unsubscribe();
  }

  unsubscribe() {
    if (!this.subscribed) {
      return;
    }

    // This will internally unsubscribe from Stomp Broker
    // There are two subscriptions - one created explicitly, the other created in the template by use of 'async'
    this.subscription.unsubscribe();
    this.subscription = null;
    this.subscribed = false;
  }

  on_next = (res: any) => {
    this.turn = res.turn;
    this.board = res.data;
    this.winner = res.winner;
    console.log(JSON.stringify(res));
  }

  getData(): Payload {
    return new Payload(this.selectedPlayer.playerId, "move", this.message);
  }

  canInteract(): boolean {
    if(this.winner){
      return false;
    }
    if(this.turn == null){
      return true;
    } else if(this.turn == this.selectedPlayer.playerId){
      return true;
    }
    return false;
  }

  getPlayerFromNumber(num: number): Player {
    if(num === 1){
      return this.circlePlayer;
    } else if(num === 2){
      return this.crossPlayer;
    }
    return null;
  }

}
