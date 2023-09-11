package com.ds.dasony.Board.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.Board.model.dao.BoardDao;
import com.ds.dasony.Board.model.vo.BoardExt;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service
public class BoardServiceImpl implements BoardService {
	
	private final BoardDao boardDao;
	
	@Autowired
	public BoardServiceImpl(BoardDao boardDao) {
		this.boardDao = boardDao;
	}
	
	@Override
	public List<BoardExt> boardDailyList(){
//		log.info("BoardService userNo = {}", );
		return boardDao.boardDailyList();
	}

}
