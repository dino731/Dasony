package com.ds.dasony.Board.model.vo;

import java.time.LocalDateTime;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BoardVs {
	private int boardNo;
	private long userNo;
    private String boardTitle;
    private String boardTag;
    private String boardContent;
    private String boardOptionLeft;
    private String boardOptionRight;
    private int boardCateNo;
    private LocalDateTime boardExpireDate;
    private int choiceLeft;
    private int choiceRight;
}
