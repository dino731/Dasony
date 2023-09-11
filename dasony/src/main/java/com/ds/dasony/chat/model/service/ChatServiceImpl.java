package com.ds.dasony.chat.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.chat.model.dao.ChatDao;
import com.ds.dasony.chat.model.vo.ChatRoom;

@Service
public class ChatServiceImpl implements ChatService{
	
	private final ChatDao chatDao;
	
	@Autowired
	public ChatServiceImpl(ChatDao chatDao) {
		this.chatDao = chatDao;
	}

	@Override
	public List<ChatRoom> selectChatList() {
		return chatDao.selectChatList();
	}

	@Override
	public int openChatRoom(ChatRoom room) {
		return chatDao.openChatRoom(room);
	}
	
	
}
