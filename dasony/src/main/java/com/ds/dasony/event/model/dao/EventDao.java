package com.ds.dasony.event.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.event.model.vo.Reward;

@Repository
public class EventDao {

	@Autowired
	private SqlSessionTemplate session;

	public List<Event> selectAllEvent(Map<String, Object> param) {
		return session.selectList("event.selectAllEvent", param);
	}

	public Event selectEvent(String no) {
		return session.selectOne("event.selectEvent", no);
	}

	public List<Reward> selectReward(String no) {
		return session.selectList("event.selectReward", no);
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

	public int insertRewardInfo(Reward reward) {
		int result = 1;
		result *= session.insert("event.insertRewardInfo", reward);
		result *= session.insert("event.insertEventRewardInfo", reward);
		
		return result;
	}
}
