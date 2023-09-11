package com.ds.dasony.chat.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ds.dasony.chat.model.service.ChatService;
import com.ds.dasony.chat.model.vo.ChatRoom;

import lombok.extern.slf4j.Slf4j;

@RestController
@Slf4j
@SessionAttributes("chatRoomNo")
public class ChatController {
	
	private final ChatService chatService;
	
	@Autowired
	public ChatController(ChatService chatService) {
		this.chatService = chatService;
	}
	
	@GetMapping("/chatlist")
	public List<ChatRoom> selectChatList(){
		
		List<ChatRoom> crList = chatService.selectChatList();
		log.info("채팅방 리스트 = {}", crList);
		
		return crList;
	}
	
//	@PostMapping("/openChatRoom")
//	public String openChatRoom(
//		@RequestBody Map<String, Object> response
//	) {	
//	
////		String userName = (String) response.get("userName");
//		ChatRoom room = (ChatRoom) response.get("newChat");
//		
//		log.info("data : " + response);
//		log.info("room L "+ room.toString());
//		
//		long userNo = Long.parseLong(response.get("userNo").toString());
//		String userName = room.getUserName();
//		
//		room.setUserNo(userNo);
//		room.setUserName(userName);
//
//		log.info("userNo = {}", userNo);
//		log.info("userName = {}", userName);
//		
//		try {
//			
////			Map<String Object> newChatData = (Map<String, Object>) response.get("newChat");
//	        
//			int chatRoomNo = chatService.openChatRoom(room);
//			
//			log.info("chatRoomNo = {}", chatRoomNo);
//			
//			if(chatRoomNo > 0) return "채팅방 개설 성공";
//			else return "채팅방 개설 실패";	
//		}catch(Exception e) {
//			log.error("예외 발생: {}", e.getMessage(), e);
//		    return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
//		}
//	
//	}
	
	@PostMapping("/openChatRoom")
	public String openChatRoom(@RequestBody Map<String, Object> requestBody) {   
		
	    try {
	    	
	        Map<String, Object> newChatData = (Map<String, Object>) requestBody.get("newChat");
	        
	        long userNo = Long.parseLong(requestBody.get("userNo").toString());
	        String userName = (String) newChatData.get("userName");
	        
	        ChatRoom room = new ChatRoom();
	        room.setUserNo(userNo);
	        room.setUserName(userName);
	        room.setChatRoomTitle((String) newChatData.get("chatRoomTitle"));
	        
	        int chatRoomNo = chatService.openChatRoom(room);
	        
	        log.info("chatRoomNo = {}", chatRoomNo);
	        
	        if (chatRoomNo > 0) return "채팅방 개설 성공";
	        else return "채팅방 개설 실패";    
	    } catch (Exception e) {
	        log.error("예외 발생: {}", e.getMessage(), e);
	        return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
	    }
	}
}
