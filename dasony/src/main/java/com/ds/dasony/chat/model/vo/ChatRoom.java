package com.ds.dasony.chat.model.vo;

import java.sql.Date;

import com.ds.dasony.donation.model.vo.Donation;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoom {

private int chatRoomNo;//	CHATROOM_NO
private int userNo;//	USER_NO
private String ChatRoomTitle;//	CHATROOM_TITLE
private String ChatRoomStatus;//	CHATROOM_STATUS
}
