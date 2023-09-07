package com.ds.dasony.game.controller;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.SessionAttributes;

import com.ds.dasony.game.model.dao.GameDao;
import com.ds.dasony.game.model.service.GameService;
import com.ds.dasony.game.model.vo.Game;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/api") // 공통주소


public class gameController {
	
	@Autowired
	private GameService gameService;
		
	@Autowired
	private ServletContext application;

	@Autowired
	private ResourceLoader resourceLoader;
	
	@PostMapping("/gamefinish")
	public  ResponseEntity<String> insertGame(@RequestBody Game gameData) {
		int result =  gameService.insertGame(gameData);
		
		
		
		if (result > 0) {
	        return ResponseEntity.ok("Success");
	    } else {
	        return ResponseEntity.badRequest().body("Failed");
	    }
		
	}
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
	
}
