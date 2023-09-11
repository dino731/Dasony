package com.ds.dasony.event.model.service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.event.model.vo.EventJoin;
import com.ds.dasony.event.model.vo.Reward;

public interface EventService {

	List<Event> selectAllEvent(Map<String, Object> param);

	Event selectEvent(String no);

	List<Reward> selectReward(String no);

	int updateEvent(HashMap<String, Object> map);

	int insertEvent(HashMap<String, Object> map);

	int deleteEvent(String no);

	int sendMsg(HashMap<String, Object> map);

	int checkEventJoin(Map<String, Object> data);

	int joinEvent(Map<String, Object> data);

	EventJoin loadLogin(Map<String, Object> data);

	int checkTdyLogin(Map<String, Object> data);

}
