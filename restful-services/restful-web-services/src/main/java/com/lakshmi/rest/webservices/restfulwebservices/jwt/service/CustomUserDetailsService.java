package com.lakshmi.rest.webservices.restfulwebservices.jwt.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import com.lakshmi.rest.webservices.restfulwebservices.jwt.entity.User;
import com.lakshmi.rest.webservices.restfulwebservices.jwt.entity.UserDTO;
import com.lakshmi.rest.webservices.restfulwebservices.jwt.repository.UserRepository;

import java.util.ArrayList;

@Service
public class CustomUserDetailsService implements UserDetailsService {
    @Autowired
    private UserRepository repository;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        User user = repository.findByUserName(username);
        return new org.springframework.security.core.userdetails.User(user.getUserName(), user.getPassword(), new ArrayList<>());
    }
    
    public User save(UserDTO user) {
		User newUser = new User();
		newUser.setUserName(user.getUserName());
		newUser.setPassword(user.getPassword());
		newUser.setEmail(user.getEmail());
		return repository.save(newUser);
	}
}
