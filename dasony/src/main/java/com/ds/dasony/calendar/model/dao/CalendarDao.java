package com.ds.dasony.calendar.model.dao;

import java.util.ArrayList;
import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.calendar.model.vo.Calendar;

@Repository
public class CalendarDao {
	
	private final SqlSessionTemplate session;
	
	@Autowired
	public CalendarDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<Calendar> calendarList() {
		return session.selectList("calendarMapper.calendarList");
	}

}
