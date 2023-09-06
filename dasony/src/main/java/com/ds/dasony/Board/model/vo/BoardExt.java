package com.ds.dasony.Board.model.vo;

import java.util.List;

import lombok.Data;

@Data
public class BoardExt extends Board {
	
	private List<BoardCare> boardCareList;
	private List<BoardCate> boardCateList;
	private List<BoardImg> boardImgList;
	private List<BoardKeyword> boardKeywordList;
	private List<BoardVideo> boardVideo;

}
