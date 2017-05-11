package game.runner;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class RController
{
	@RequestMapping("/hi")
	public String sayHi(){
		return "hello";
	}
}
