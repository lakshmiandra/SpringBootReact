package com.lakshmi.rest.webservices.restfulwebservices.todo;

import java.net.URI;
import java.util.List;

import org.assertj.core.api.UriAssert;
import org.hibernate.validator.internal.engine.ServiceLoaderBasedConstraintMappingContributor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;

@RestController
@CrossOrigin
public class TodoJpaResource {
	
	@Autowired
	private TodoHarcodedService todoService;
	
	@Autowired
	private TodoJpaRepository todoRepo;
	
	@GetMapping("/jpa/users/{username}/todos")
	public List<Todo> getAllTodos(@PathVariable String username) {
		
		return todoRepo.findByUserName(username);
		//return todoService.findAll();
	}
	
	@GetMapping("/jpa/users/{username}/todos/{id}")
	public Todo getTodo(@PathVariable String username, @PathVariable long id) {
		
		return todoRepo.findById(id).get();
		//return todoService.findById(id);
	}
	
	@PutMapping("/jpa/users/{username}/todos/{id}")
	public Todo saveTodo(@PathVariable String username, @PathVariable long id,
			@RequestBody Todo todo) {
	//public ResponseEntity<Todo> saveTodo(@PathVariable String username, @PathVariable long id,
			//@RequestBody Todo todo) {
		todo.setUserName(username);
		Todo todoUpdated = todoRepo.save(todo);
		//return new ResponseEntity<Todo>(todoUpdated,HttpStatus.OK);
		return todoUpdated;
	}
	
	@PostMapping("/jpa/users/{username}/todos")
	public ResponseEntity<Todo> createTodo(@PathVariable String username,
			@RequestBody Todo todo) {
		todo.setUserName(username);
		Todo createdTodo = todoRepo.save(todo);
		URI uri = ServletUriComponentsBuilder.fromCurrentRequest().path("/{id}").buildAndExpand(createdTodo.getId()).toUri();
		
		return ResponseEntity.created(uri).build();
	}
	
	@DeleteMapping("/jpa/users/{username}/todos/{id}")
	public ResponseEntity<Void> deleteTodoById(@PathVariable String username, @PathVariable long id) {
//		Todo todo = todoService.deleteById(id);
//		if (todo != null) 
//			return ResponseEntity.noContent().build();
//		return ResponseEntity.notFound().build();
		
		todoRepo.deleteById(id);
		return ResponseEntity.noContent().build();
	}

}
