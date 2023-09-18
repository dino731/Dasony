package com.ds.dasony.Board.model.vo;

import com.ds.dasony.member.model.vo.User;

import lombok.Data;

@Data
public class BoardExt extends Board{
	
	private User user;
	private BoardVideo boardVideo;
	private BoardImg boardImg;
	private BoardCate boardCate;
	private int userViewCount;//USER_VIEW_COUNT
	private int replyCount;//REPLY_COUNT
	private BoardTag boardTag;
	public String userRegion;
		

}
