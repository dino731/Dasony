package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class BoardCare {
	private int boardNo;//BOARD_NO
	private int userNo;//USER_NO
}
