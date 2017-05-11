package game.runner;

import java.util.List;

public class IncomingMessage {
	public Integer from;
	public String command;
	public List<List<Integer>> data;
	public Integer getFrom()
	{
		return from;
	}
	public void setFrom( Integer from )
	{
		this.from = from;
	}
	public String getCommand()
	{
		return command;
	}
	public void setCommand( String command )
	{
		this.command = command;
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
