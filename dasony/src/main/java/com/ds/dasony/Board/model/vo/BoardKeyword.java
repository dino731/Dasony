package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class BoardKeyword {
	private String boardTag;	//BOARD_TAG
	private int boardNo;	//BOARD_NO
	
	public BoardKeyword(){
		
	}
}
