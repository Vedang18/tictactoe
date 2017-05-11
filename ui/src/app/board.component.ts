import { Component, Input } from '@angular/core';

import { StompService } from 'ng2-stomp-service';

import { Player } from './player';
import { Payload } from './payload';

@Component({
    selector: 'app-board',
    template: `
        <div *ngFor="let row of boardData; let rowNum=index">
            <button *ngFor="let cell of row; let colNum=index" (click)="updateBoard(rowNum, colNum)">{{getCellChar(cell)}}</button>
        </div>
    `,
})
export class BoardComponent{
    @Input() public boardData: Array<Array<number>> = [];
    @Input() selectedPlayer: Player;
    @Input() canInteract: boolean;

    constructor(private stompService: StompService){}

    getCellChar(num: number): string {
        if (num === 0)
            return '–';
        else if (num === 1)
            return 'O';
        else
            return 'X';
    }

    updateBoard(rowNum: number, colNum: number): void {
        if(!this.canInteract)
            return;
        this.boardData[rowNum][colNum] = this.selectedPlayer.playerId;
        this.stompService.send('/app/chat/', this.getData());
    }

    getData(): Payload {
        return new Payload(this.selectedPlayer.playerId, "move", this.boardData);
    }
}