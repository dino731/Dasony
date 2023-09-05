package com.ds.dasony.Board.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class Board {
	private int boardNo;			//BOARD_NO
	private int userNo;				//USER_NO
	private String boardTitle;		//BOARD_TITLE
	private Date boardWriteDate;	//BOARD_WRITE_DATE
	private int boardView;			//BOARD_VIEWS
	private String boardContent;	//BOARD_CONTENT
	private String boardStatus;		//BOARD_STATUS
	private int boardCateNo;		//BOARD_CATE_NO
	
	public Board() {
		
	}

}
