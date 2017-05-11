package game.runner;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.stereotype.Controller;

@Controller
public class MainController {
	
	private static final Integer CIRCLE = 1;
	private static final Integer CROSS = 2;
	
	@Autowired
	private BoardChecker checker;
	
	@MessageMapping("/chat/")
	@SendTo("/topic/messages")
	public OutgoingMessage getMessage(IncomingMessage message){
		OutgoingMessage outMsg = new OutgoingMessage();
		outMsg.setTurn( message.getFrom().equals( CIRCLE ) ? CROSS : CIRCLE );
		outMsg.setData( message.data );
		outMsg.setCommand( "move" );
		outMsg.setWinner( checker.checkBoard( message.getData() ) );
		return outMsg;
	}
}
