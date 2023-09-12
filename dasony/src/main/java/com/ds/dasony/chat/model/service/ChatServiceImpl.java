package com.ds.dasony.chat.model.service;

import java.sql.Date;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.Utils;
import com.ds.dasony.chat.model.dao.ChatDao;
import com.ds.dasony.chat.model.vo.ChatJoin;
import com.ds.dasony.chat.model.vo.ChatMessage;
import com.ds.dasony.chat.model.vo.ChatRoom;

@Service
//@Slf4j
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
		int chatRoomNo = chatDao.openChatRoom(room);
		return chatRoomNo;
	}

	@Override
	public int insertChatMessage(ChatMessage chatMessage) {
		
		chatMessage.setChatMsg(Utils.newLineHandling(chatMessage.getChatMsg()));
		chatMessage.setChatDate(new Date(System.currentTimeMillis()));
		
		return chatDao.insertChatMessage(chatMessage);
	}

	@Override
	public List<ChatMessage> joinChatRoom(ChatJoin join) {
		
		int result = chatDao.joinCheck(join);
		
		if(result == 0) {
			chatDao.joinChatRoom(join);
		}
		return chatDao.selectChatMessage(join.getChatRoomNo());
	}
}
