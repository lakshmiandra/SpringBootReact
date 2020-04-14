package com.lakshmi.rest.webservices.restfulwebservices;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class BCryptEncoderTest {

	public static void main(String[] args) {
		BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();
		for(int i=1;i<=10;i++) {
			String encoded = bCryptPasswordEncoder.encode("password@!23@#!");
			System.out.println(encoded);
		}
	}

}
