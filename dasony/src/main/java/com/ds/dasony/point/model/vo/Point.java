package com.ds.dasony.point.model.vo;

import java.sql.Date;

import lombok.Data;

@Data
public class Point {
	private int PointNo;
	private long userNo;
	private String pointContent;
	private int pointAmount;
	private Date ExpireDate;
	private Date pointEventDate;
	private String pointCate;
}
