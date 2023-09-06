package com.ds.dasony.game.model.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class Game {
	
	private int gameNo;
	private Date gameDate;
	private String gameStatus;
	private String pointStatus;
	private String ticketStatus;
	private long userNo;
	
}
