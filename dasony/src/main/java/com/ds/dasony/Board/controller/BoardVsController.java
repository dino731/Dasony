package com.ds.dasony.Board.controller;

import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.Board.model.service.BoardVsService;
import com.ds.dasony.Board.model.vo.BoardVs;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class BoardVsController {
	
	private final BoardVsService boardVsService;
	
	@Autowired
	public BoardVsController(BoardVsService boardVsService) {
		this.boardVsService = boardVsService;
	}
	
	@PostMapping("/boardVsInsert")
	public ResponseEntity<String> boardVsInsert (@RequestBody BoardVs boardVs){
		log.info("boardVs값 : {}", boardVs.getUserNo());
		int result1 = boardVsService.boardVsInsert(boardVs);
		
		if(result1 > 0) {
			return ResponseEntity.ok("글을 작성하였습니다.");
		} else {
			return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("다시 시도해주세요.");
		}
	}

}
