package com.lakshmi.rest.webservices.restfulwebservices.helloworld;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

@RestController
@CrossOrigin(origins="http://localhost:4200")
public class BasicAuthenticationController {
	
	@GetMapping(path="/hello-world")
	public String helloWorld() {
		return "Hello-World";
	}
	
	@GetMapping(path="/basicAuth")
	public AuthenticationBean helloWorldBean() {
		return new AuthenticationBean("Hello-World-Bean");
	}
	
	@GetMapping(path="/hello-world/path-variable/{name}")
	public AuthenticationBean helloWorldPathVariable(@PathVariable String name) {
		 //throw new RuntimeException("Soething went wrong");
		return new AuthenticationBean(String.format("Hello-World, %s", name));
	}
}
