package com.ds.dasony.chat.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.chat.model.vo.ChatRoom;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class ChatDao {
	
	private SqlSessionTemplate session;
	
	@Autowired
	public ChatDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<ChatRoom> selectChatList() {
		return session.selectList("chatMapper.selectChatList");
	}

	public int openChatRoom(ChatRoom chatRoom) {
		log.info("room : " + chatRoom.toString());
		int result = session.insert("chatMapper.openChatRoom", chatRoom);
		
		if(result > 0) {
			result = chatRoom.getChatRoomNo();
		}
//		log.info("ggggg L " + result);
		
		return result;
	}
	
	
}
