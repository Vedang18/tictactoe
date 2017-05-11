package game.runner;

import java.util.List;

public class OutgoingMessage
{
	String command;
	Integer turn;
	List<List<Integer>> data;
	Integer winner;
	
	public Integer getWinner()
	{
		return winner;
	}
	public void setWinner( Integer winner )
	{
		this.winner = winner;
	}
	public String getCommand()
	{
		return command;
	}
	public void setCommand( String command )
	{
		this.command = command;
	}
	
	public Integer getTurn()
	{
		return turn;
	}
	public void setTurn( Integer turn )
	{
		this.turn = turn;
	}
	public List<List<Integer>> getData()
	{
		return data;
	}
	public void setData( List<List<Integer>> data )
	{
		this.data = data;
	}
	
	
}
