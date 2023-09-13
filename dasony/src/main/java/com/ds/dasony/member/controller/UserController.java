package com.ds.dasony.member.controller;


import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.member.model.service.UserService;
import com.ds.dasony.member.model.vo.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
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
//		log.info("map={}", map);
//		log.info("map.get('id')================================>>>>>>{}", map.get("id"));
		if(map.get("id") != ""&&map.get("nick")=="") {
			userId = String.valueOf(map.get("id"));
//			log.info("userId =============================>{},", userId);
			validation = userService.chkValidateId(userId);
		} else {
			userNick = String.valueOf(map.get("nick"));
//			log.info("userNick =============================>{},", userNick);
			validation = userService.chkValidateNick(userNick);
		}
//		log.info("validation===============>>>>>>>>>>>>>>>>>{}", validation);
		
		return validation;
	}
	
	
	@PostMapping("/signUp")
	public Map<String, Object> signUp(
			@RequestBody User user
			){
		
		Map<String, Object> map = new HashMap<>();
		
		User validateUser = new User();
		
		// 응답 데이터 생성
//		log.info("user={}", user);
		
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
		
//		log.error("userNo 확인 ==================>>", request.get("userNo"));
//		log.error("userNo 확인 ==================>>", request.get("location"));
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
	
	@PostMapping("/findingId")
	public Map<String, Object> fingdingId(
			@RequestBody Map<String, String> email
			){
		String subEmail = email.get("subEmail"); 
//		log.error(subEmail);
		Map<String, Object> map = new HashMap();
		
		User user = userService.findingId(subEmail);
		String userId = user.getUserId();
//		log.error("{}=","Id는 "+userId+" 입니다.");
		if(user != null) {
			map.put("msg", "Id는 "+userId+" 입니다.");
		} else {
			map.put("err", "Id를 찾지 못했습니다.");
		}
		
		return map;
	}
	
	@PostMapping("/userInfo")
	public Map<String, Object> userInfo(
			@RequestBody Map<String, String> userno
			){
		
		long userNo = Long.parseLong(userno.get("userNo"));
		
//		log.info(userno.get("userNo"));
		
		Map<String, Object> map = new HashMap();
		
		User user = new User();
		
		user = userService.userInfo(userNo);
		
		if(user != null) {
			map.put("user", user);
		} else {
			map.put("err","알 수 없는 오류가 발생했습니다.");
		}
		
		return map;
	}
	
	@PostMapping("/getMyInfo")
	public Map<String, Object> getMyInfo(
			@RequestBody Map<String, Object> requestData
			){
		int userNo = (int) requestData.get("userNo");
		Map<String,Object> myInfo = new HashMap();
	    myInfo.put("myInfo",userService.getMyInfo(userNo));
		
		return myInfo;
	}
	
	@PostMapping("/modifyMyInfo")
	public int modifyMyInfo(
			@RequestBody Map<String, Object> myInfo
			){
		
		int result = userService.modifyMyInfo(myInfo);
	    
		log.info("myInfo={}",myInfo);
		return result;
	}
	
	@PostMapping("/changeNewPwd")
	public int changeNewPwd(@RequestBody Map<String,Object> pwdInfo) {
		
		int result = userService.changeNewPwd(pwdInfo);
		
		return result;
	}
	
	@PostMapping("getMyLikesList")
	public Map<String, Object> getMyLikesList(@RequestBody int userNo){
		Map<String,Object> likesList = new HashMap();
		likesList.put("likesList", userService.getMyLikesList(userNo));
		
		return likesList;
	}
	
	
	
	
}
