package com.ds.dasony.member.model.vo;

import java.sql.Date;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class User {
	
	private long userNo;
	private String userId;
	private String userPwd;
	private String userName;
	private String userNick;
	private String userAddress;
	private String userRegion;
	private String userPhone;
	private String userEmail;
	private String userLevel;
	private Date userJoinDate;
	private Date userModDate;
	private String userStatus;
	
	public User(){
		
	}

}