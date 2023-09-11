package com.ds.dasony.chat.model.service;

import java.util.List;

import com.ds.dasony.chat.model.vo.ChatRoom;

public interface ChatService {

	List<ChatRoom> selectChatList();

	int openChatRoom(ChatRoom room);

}
