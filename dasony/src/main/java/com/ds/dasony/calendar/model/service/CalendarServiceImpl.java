package com.ds.dasony.calendar.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.calendar.model.dao.CalendarDao;
import com.ds.dasony.calendar.model.vo.Calendar;

@Service
public class CalendarServiceImpl implements CalendarService{

	private final CalendarDao calendarDao;
	
	@Autowired
	public CalendarServiceImpl(CalendarDao calendarDao) {
		this.calendarDao = calendarDao;
	}
	@Override
	public List<Calendar> calendarList() {
		return calendarDao.calendarList();
	}

}
