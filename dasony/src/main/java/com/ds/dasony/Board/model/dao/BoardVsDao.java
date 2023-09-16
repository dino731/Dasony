package com.ds.dasony.Board.model.dao;

import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.Board.model.vo.BoardVs;

@Repository
public class BoardVsDao {
	
	private final SqlSessionTemplate session;
	
	@Autowired
	public BoardVsDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public int boardVsInsert(BoardVs boardVs) {
		return session.insert("boardVsMapper.boardVsInsert", boardVs);
	}

	public int boardInsert(Map<String, Object> map) {
		return session.insert("boardVsMapper.boardInsert", map);
	}

}
