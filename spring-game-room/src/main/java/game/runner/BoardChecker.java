package game.runner;

import java.util.List;

import org.springframework.stereotype.Component;

@Component
public class BoardChecker
{
	public Integer checkBoard(List<List<Integer>> boardData){
		if(checkForPlayer( boardData, 1 )){
			return 1;
		} else if(checkForPlayer( boardData, 2 )) {
			return 2;
		}
		return 0;
	}
	
	private boolean checkForPlayer(List<List<Integer>> boardData, Integer playerId){
		for(int i = 0; i < boardData.size(); i++){
			Integer leftMostCell = boardData.get(i).get(0);
			if(leftMostCell.equals( playerId ) && leftMostCell.equals( boardData.get(i).get(1) ) && leftMostCell.equals( boardData.get(i).get(2) )){
				return true;
			}
		}
		for(int i = 0; i < boardData.size(); i++){
			Integer topMostCell = boardData.get(0).get(i);
			if(topMostCell.equals( playerId ) && topMostCell.equals( boardData.get(1).get(i) ) && topMostCell.equals( boardData.get(2).get(i) )){
				return true;
			}
		}
		Integer topLeftCell = boardData.get( 0 ).get( 0 );
		if(topLeftCell.equals( playerId ) && topLeftCell.equals( boardData.get(1).get(1) ) && topLeftCell.equals( boardData.get(2).get(2) )){
			return true;
		}
		Integer topRightCell = boardData.get( 0 ).get( 2 );
		if(topRightCell.equals( playerId ) && topRightCell.equals( boardData.get(1).get(1) ) && topRightCell.equals( boardData.get(2).get(0) )){
			return true;
		}
		return false;
	}
}
