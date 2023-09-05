package com.ds.dasony.game.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;

import com.ds.dasony.game.model.service.GameServiceImpl;
import com.ds.dasony.game.model.vo.Game;

public class GameDao {
	
	@Autowired
	private SqlSessionTemplate session;
	
	public int insertGame(Game g) {
		int result = session.insert("game.insertGame", g);
	if(result>0) {
		
		return result;
	}else {
		return result;
	}
	}

}
