package com.ds.dasony.game.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.game.model.vo.Game;

@Repository
public class GameDao {
	
	@Autowired
	private SqlSessionTemplate session;
	
	public int insertGame(Game gameData) {
		int result = session.insert("game.insertGame",gameData);
		

		return result;
	}

}
