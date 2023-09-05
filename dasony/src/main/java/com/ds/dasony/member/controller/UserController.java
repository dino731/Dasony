package com.ds.dasony.member.controller;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.member.model.service.UserService;
import com.ds.dasony.member.model.vo.User;
import com.fasterxml.jackson.annotation.JsonProperty;

import lombok.extern.slf4j.Slf4j;


@RestController
@Slf4j
public class UserController {

	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	
	@PostMapping("/api/test")
	@JsonProperty("user")
	public String signUp(
			@RequestBody User user
			){
		// 응답 데이터 생성
		log.info("user={}", user);
        String response = "Data received successfully";
        return response;
		
	}
}
