package com.ds.dasony.Board.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.Board.model.vo.BoardExt;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Repository
public class BoardDao {
	private SqlSessionTemplate session;
	
	@Autowired
	public BoardDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<BoardExt> boardDailyList(){
//		log.info("BoardDao userNo = {}", userNo);
		return session.selectList("board.boardDailyList");
	}
}
