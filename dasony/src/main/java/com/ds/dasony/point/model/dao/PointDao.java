package com.ds.dasony.point.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.point.model.vo.Point;

@Repository
public class PointDao {

	@Autowired
	private SqlSessionTemplate session;
	
	public int insertPoint(Point pointData) {
		int result = session.insert("point.insertPoint",pointData);
		return result;
		
	}
	
	public int updateMemberTotalPoint(Point pointData) {
		return session.update("point.updateMemberTotalPoint",pointData);
	}
	
}