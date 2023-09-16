package com.ds.dasony.Board.model.service;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.Board.model.dao.BoardVsDao;
import com.ds.dasony.Board.model.vo.BoardVs;

@Service
public class BoardVsServiceImpl implements BoardVsService {
	
	private final BoardVsDao boardVsDao;
	@Autowired
	public BoardVsServiceImpl(BoardVsDao boardVsDao) {
		this.boardVsDao = boardVsDao;
	}
	@Override
	public int boardVsInsert(BoardVs boardVs) {
		return boardVsDao.boardVsInsert(boardVs);
	}
	@Override
	public int boardInsert(Map<String, Object> map) {
		return boardVsDao.boardInsert(map);
	}
	
	
}
