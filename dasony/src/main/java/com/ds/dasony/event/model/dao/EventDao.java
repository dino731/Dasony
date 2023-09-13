package com.ds.dasony.event.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.event.model.vo.EventJoin;
import com.ds.dasony.event.model.vo.Reward;

import lombok.extern.slf4j.Slf4j;

@Repository
@Slf4j
public class EventDao {

	@Autowired
	private SqlSessionTemplate session;

	public List<Event> selectAllEvent(Map<String, Object> param) {
		return session.selectList("event.selectAllEvent", param);
	}

	public Event selectEvent(String no) {
		Event result = session.selectOne("event.selectEvent", no);
		log.info("event : " + result.toString());
		return result;
	}

	public List<Reward> selectReward(String no) {
		List<Reward> result = session.selectList("event.selectReward", no);
		log.info("reward : " + result.toString());
		return result;
	}

	public int updateEventInfo(Event event) {
		int result = 1;
		result *= session.update("event.updateEventInfo", event);
		result *= session.update("event.updateEventCategory", event);
		result *= session.update("event.updateEventWinCategory", event);
		return result;
	}

	public int updateRewardInfo(Reward reward) {
		int result = 1;
		result *= session.update("event.updateRewardInfo", reward);
		result *= session.update("event.updateEventRewardInfo", reward);
		return result;
	}

	public int insertRewardInfo(Reward reward){
		int result = 1;
		reward.setRewardRange(session.selectOne("event.changeRewardRange", reward.getRewardRange()));
		
		result *= session.insert("event.insertRewardInfo", reward);
		result *= session.insert("event.insertEventRewardInfo", reward);
		return result;
	}

	public int insertEventInfo(Event event) {
		int result = 1;
		result *= session.insert("event.insertEventInfo", event);
		result *= session.insert("event.insertEventCategory", event);
		result *= session.insert("event.insertEventWinCategory", event);
		
//		log.info("event : " + event.toString());
		return result;
	}

	public int deleteEvent(String no) {
		return session.update("event.deleteEvent", no);
	}

	public int sendMsg(HashMap<String, Object> map) {
		int result = 1;
		String title = ((Event)map.get("event")).getTitle();
		map.put("title", title);
		
		String msgRange = (String) map.get("msgRange");
		List<Integer> targets = session.selectList("event.selectMsgTarget", msgRange);
//		log.info("list : " + targets.toString());
		
		for(int target : targets) {
			map.put("target", target);
			result *= session.insert("event.sendMsg", map);
		}
		
		return result;
	}

	public int checkEventJoin(Map<String, Object> data) {
		return session.selectOne("event.checkEventJoin", data);
	}

	public int joinEvent(Map<String, Object> data) {
		return session.insert("event.joinEvent", data);
	}
	
	public EventJoin loadLogin(Map<String, Object> data) {
		EventJoin result = session.selectOne("event.loadLogin", data);
		if(result==null) {
			result = session.selectOne("event.memberLoginInfo", data);
			result.setCount(session.selectOne("event.findLast", data));
			result.setTdyCheck("N");
		}
		return result;
	}

	public int checkTdyLogin(Map<String, Object> data) {
		int lastNum = session.selectOne("event.findLast", data);
		data.put("lastNum", lastNum);
		log.info("str  : " + lastNum);
		int result = session.insert("event.checkTdyLogin", data);
		log.info("Result : " + result);
		
		return result;
	}
	
}
