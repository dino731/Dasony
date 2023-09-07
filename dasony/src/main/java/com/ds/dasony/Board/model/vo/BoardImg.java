package com.ds.dasony.Board.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BoardImg {
	private	int boardImgNo;				//BOARD_IMG_NO
	private String boardImgModName;		//BOARD_IMG_MOD_NAME
	private String boardImgOriName;		//BOARD_IMG_ORI_NAME
	private String boardImgPath;		//BOARD_IMG_PATH
	private Date boardImgUploadDate;	//BOARD_IMG_UPLOAD_DATE
	private String boardImgLevel;		//BOARD_IMG_LEVEL
	private String boardImgStatus;		//BOARD_IMG_STATUS
	private int boardNo;				//BOARD_NO
	private int userNo;					//USER_NO
	
	public BoardImg() {
		
	}
}
