package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BoardVideo {
	private int videoNo;	//VIDEO_NO
	private String videoModName;	//VIDEO_MOD_NAME
	private String videoOriName;	//VIDEO_ORI_NAME
	private String videoPath;	//VIDEO_PATH
	private String videoUploadDate;	//VIDEO_UPLOAD_DATE
	private int boardNo;	//BOARD_NO
	private int userNo;	//USER_NO
	
	public BoardVideo() {
		
	}
}
