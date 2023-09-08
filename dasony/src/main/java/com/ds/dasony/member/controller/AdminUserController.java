package com.ds.dasony.member.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.member.model.service.UserService;
import com.ds.dasony.member.model.vo.User;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@RequestMapping("/api/admin")
public class AdminUserController {

	private  final UserService userService;
	
	@Autowired
	public AdminUserController(UserService userService) {
		this.userService = userService;
	}
	
	@GetMapping("/userList")
	public List<User> userList(HttpServletResponse response){
		List<User> list = userService.selectUserList();
		log.info("list={}, ", list);
		
		return list;
	}
	
	
}
