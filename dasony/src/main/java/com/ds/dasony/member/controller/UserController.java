package com.ds.dasony.member.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.member.model.service.UserService;
import com.ds.dasony.member.model.vo.User;

import lombok.extern.slf4j.Slf4j;

@RequestMapping("/api")
@RestController
@Slf4j
public class UserController {

	private final UserService userService;
	
	@Autowired
	public UserController(UserService userService) {
		this.userService = userService;
	}
	
	@PostMapping("/chkValidate")
	public int chkValidate(
			@RequestBody HashMap<String, Object> map
			) {
		int validation = 0;
		String userId = "";
		String userNick = "";
		log.info("map={}", map);
		log.info("map.get('id')================================>>>>>>{}", map.get("id"));
		if(map.get("id") != ""&&map.get("nick")=="") {
			userId = String.valueOf(map.get("id"));
			log.info("userId =============================>{},", userId);
			validation = userService.chkValidateId(userId);
		} else {
			userNick = String.valueOf(map.get("nick"));
			log.info("userNick =============================>{},", userNick);
			validation = userService.chkValidateNick(userNick);
		}
		log.info("validation===============>>>>>>>>>>>>>>>>>{}", validation);
		
		return validation;
	}
	
	
	@PostMapping("/signUp")
	public Map<String, Object> signUp(
			@RequestBody User user
			){
		
		Map<String, Object> map = new HashMap<>();
		
		User validateUser = new User();
		
		// 응답 데이터 생성
		log.info("user={}", user);
		
		int result = userService.insertUser(user);
		
		if(result > 0) {
			
			map.put("msg", "회원 가입이 완료되었습니다! 즐거운 다소니와 함께해요");
			
			validateUser = userService.userForLocation(user.getUserId());
			map.put("user", validateUser);
			
		} else {
			map.put("error", "회원 가입에 실패했습니다.");
		}
        return map;
		
	}
	
	@PostMapping("/location")
	public Map<String, Object> location(
			@RequestBody Map<String, Object> request
			){
		
		log.error("userNo 확인 ==================>>", request.get("userNo"));
		log.error("userNo 확인 ==================>>", request.get("location"));
		int result = userService.location(request);
		
		Map<String, Object> map = new HashMap();
		
		if(result > 0) {
			map.put("msg", "지역 설정에 성공했습니다.");
		} else {
			map.put("msg", "지역 설정에 실패했습니다. 마이페이지에서 다시 설정해주세요.");
		}
		
		return map;
	}
	
	@PostMapping("/login")
	public Map<String, Object> login(
			@RequestBody User user
			){
		Map<String, Object> userMap = new HashMap();
		userMap.put("userId", user.getUserId());
		userMap.put("userPwd", user.getUserPwd());
		
		User result = userService.login(userMap);
		
		Map<String, Object> map = new HashMap();
		
		if(result != null) {
			map.put("msg", "로그인에 성공했습니다.");
			map.put("user", result);
		} else {
			map.put("err", "아이디/비밀번호를 확인해주세요.");
		}
		
		return map;
	}
	
	
	
	
	
	
}
