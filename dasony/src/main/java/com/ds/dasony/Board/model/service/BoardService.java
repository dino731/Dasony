package com.ds.dasony.Board.model.service;

import java.util.List;

import com.ds.dasony.Board.model.vo.BoardCare;
import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.Board.model.vo.BoardImg;
import com.ds.dasony.Board.model.vo.BoardTag;
import com.ds.dasony.Board.model.vo.BoardWriterForm;
import com.ds.dasony.Board.model.vo.Reply;

public interface BoardService {
	
	public List<BoardExt> boardDailyList(String userRegion);
	public int insertBoard(BoardWriterForm boardWriterForm, List<BoardImg> bImg, BoardTag bt, String severFolderPath) throws Exception;
	public int insertBordViews(int boardNo);
	public List<BoardDetailExt> boardDetail(int boardNo);
	public BoardWriterForm boardEdit (int BoardNo);
	public int insertReply(Reply r , int userNo);
//	public List<Reply> replySelect(List<Reply> rUserNoList);
	public int insertHeart(BoardCare bc);
	public int deleteHeart(BoardCare bc);
	public int serchHeart(BoardCare bc);
	

}
