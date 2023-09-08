package com.ds.dasony.calendar.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.calendar.model.service.CalendarService;
import com.ds.dasony.calendar.model.vo.Calendar;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api")
public class CalendarController {
	
	private final CalendarService calendarService;
	
	@Autowired
	public CalendarController(CalendarService calendarService) {
		this.calendarService = calendarService;
	}

	@PostMapping("/calendarList")
	public Map<String, Object> calendarList(
			){
		List<Calendar> calendars = new ArrayList();
		Map<String, Object> map = new HashMap();
		
		calendars = calendarService.calendarList();
		
		if(calendars != null) {
			map.put("calendarList", calendars);
		} else {
			map.put("msg", "다시 시도해주세요.");
		}
		
		return map;
	}
	
	
	
	
	
}
