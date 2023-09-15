package com.ds.dasony.Board.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.Board.model.vo.BoardCare;
import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.Board.model.vo.BoardImg;
import com.ds.dasony.Board.model.vo.BoardTag;
import com.ds.dasony.Board.model.vo.BoardWriterForm;
import com.ds.dasony.Board.model.vo.Reply;
import com.ds.dasony.member.model.vo.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class BoardDao {
	private SqlSessionTemplate session;
	
	@Autowired
	public BoardDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<BoardExt> boardDailyList(String userRegion){
//		log.info("BoardDao boardDailyList, userRegion = {}", userRegion);
		return session.selectList("board.boardDailyList", userRegion);
	}
	
	public int insertBoard(BoardWriterForm boardWriterForm ) {
//		log.info("BoardDao insertBoard, b = {}", boardWriterForm.toString());
		int result = 0;
		result = session.insert("board.insertBoard",boardWriterForm);
		if(result > 0) {
			result = boardWriterForm.getBoardNo();
//			log.info("dao boardWriterForm.getBoardNo= {}",boardWriterForm.getBoardNo());
		}
		return result;
	}
	
	public int insertBoardImg(List<BoardImg> bImg) {
//		log.info("dao insertBoardImg bImg= {}",bImg);
		int result = 1;
		for(BoardImg  b:  bImg) {
			result *= session.insert("board.insertBoardImg",b);
		}
		return result;
	}
	
	public int insertBoardKeyword(BoardTag bt) {
//		log.info("dao insertBoardKeyword boardWriterForm = {}",bt);
		int result = 0;
		result = session.insert("board.insertBoardKeyword",bt);
		return result;
	}
	
	public int insertBordViews(int boardNo) {
		return session.update("board.insertBordViews", boardNo);
	}
	public List<BoardDetailExt> boardDetail(int BoardNo){
		log.info("BoardDao boardDetail, BoardNo = {}", BoardNo);

			return session.selectList("board.boardDetail", BoardNo);
	}
		
	public BoardWriterForm boardEdit(int BoardNo){
		log.info("BoardDao boardDetail, BoardNo = {}", BoardNo);
		return session.selectOne("board.boardEdit", BoardNo);
	}
	
	public int insertReply(Reply r, int userNo) {
		 User list = session.selectOne("board.replyGetNick", userNo);
		 String rUserNick = list.getUserNick();
		if(list != null) {
			r.setRUserNick(rUserNick);
		}
		int result = 0;
		result = session.insert("board.insertReply",r);
		if(result > 0) {
			log.info("boardDao insertReply 등록 성공 = {}",result);
		}
		return result;
	}
	public  int serchHeart(BoardCare bc) {
		return session.selectOne("board.serchHeart",bc);
	}
	
	
	public int insertHeart(BoardCare bc) {
		int result = 0;
		result = session.insert("board.insertHeart",bc);
		if(result > 0) {
			log.info("boardDao insertReply 등록 성공 = {}",result);
		}
		return result;
	}
	public int deleteHeart(BoardCare bc) {
		int result = 0;
		result = session.insert("board.deleteHeart",bc);
		if(result > 0) {
			log.info("boardDao deleteHeart 삭제 성공 = {}",result);
		}
		return result;
	}
	
	
	
	
	
	
}
