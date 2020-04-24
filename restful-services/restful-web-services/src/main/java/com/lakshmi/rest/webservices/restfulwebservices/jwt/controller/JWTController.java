package com.lakshmi.rest.webservices.restfulwebservices.jwt.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lakshmi.rest.webservices.restfulwebservices.jwt.entity.AuthRequest;
import com.lakshmi.rest.webservices.restfulwebservices.jwt.entity.UserDTO;
import com.lakshmi.rest.webservices.restfulwebservices.jwt.service.CustomUserDetailsService;
import com.lakshmi.rest.webservices.restfulwebservices.jwt.util.JwtUtil;

@RestController
public class JWTController {
	
	@Autowired
	private CustomUserDetailsService userdetailService;
	
    @Autowired
    private JwtUtil jwtUtil;
    @Autowired
    private AuthenticationManager authenticationManager;

    @GetMapping("/")
    public String welcome() {
        return "Welcome to javatechie !!";
    }

    @PostMapping("/authenticate")
    public String generateToken(@RequestBody AuthRequest authRequest) throws Exception {
        try {
            authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(authRequest.getUserName(), authRequest.getPassword())
            );
        } catch (Exception ex) {
            throw new Exception("inavalid username/password");
        }
        return jwtUtil.generateToken(authRequest.getUserName());
    }
    
    @PostMapping("/register")
	public ResponseEntity<?> saveUser(@RequestBody UserDTO user) throws Exception {
		return ResponseEntity.ok(userdetailService.save(user));
	}
}
