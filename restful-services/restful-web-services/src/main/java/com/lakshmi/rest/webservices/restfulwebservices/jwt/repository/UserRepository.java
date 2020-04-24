package com.lakshmi.rest.webservices.restfulwebservices.jwt.repository;


import org.springframework.data.jpa.repository.JpaRepository;

import com.lakshmi.rest.webservices.restfulwebservices.jwt.entity.User;

public interface UserRepository extends JpaRepository<User,Integer> {
    User findByUserName(String username);
}
