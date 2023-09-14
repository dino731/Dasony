package com.ds.dasony.chat.model.service;

import java.util.List;

import com.ds.dasony.chat.model.vo.ChatCare;
import com.ds.dasony.chat.model.vo.ChatJoin;
import com.ds.dasony.chat.model.vo.ChatMessage;
import com.ds.dasony.chat.model.vo.ChatRoom;

public interface ChatService {

	List<ChatRoom> selectChatList();

	int openChatRoom(ChatRoom room);

	int insertChatMessage(ChatMessage chatMessage);

	List<ChatMessage> joinChatRoom(ChatJoin join);

	int exitChat(ChatJoin join);

	List<ChatRoom> selectUserChatList(long userNo);

	int addStars(ChatCare care);

	List<ChatCare> getStars();

}
