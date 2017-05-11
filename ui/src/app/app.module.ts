import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './board.component';
// import {ConfigService} from './services/config/config.service';
// import {StompConfigService, StompService} from "@stomp/ng2-stompjs";
import { StompService } from 'ng2-stomp-service';


@NgModule({
  declarations: [
    AppComponent,
    BoardComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [
    // StompService,
    // {
    //   provide: StompConfigService,
    //   useClass: ConfigService
    // }
    StompService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
