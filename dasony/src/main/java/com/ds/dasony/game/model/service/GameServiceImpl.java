package com.ds.dasony.game.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import com.ds.dasony.game.model.dao.GameDao;
import com.ds.dasony.game.model.vo.Game;

@Service
public class GameServiceImpl implements GameService{
	
	@Autowired
	private GameDao gameDao;
	
	@Override
	public int insertGame(Game g) {
		return gameDao.insertGame(g);
	}
	
}
