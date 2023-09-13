package com.ds.dasony.Board.model.service;

import java.util.List;

import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.Board.model.vo.BoardImg;
import com.ds.dasony.Board.model.vo.BoardTag;
import com.ds.dasony.Board.model.vo.BoardWriterForm;

public interface BoardService {
	
	public List<BoardExt> boardDailyList(String userRegion);
	public int insertBoard(BoardWriterForm boardWriterForm, List<BoardImg> bImg, BoardTag bt, String severFolderPath) throws Exception;
	public List<BoardDetailExt> boardDetail(int BoardNo);
	public BoardWriterForm boardEdit (int BoardNo);
	

}
