package com.ds.dasony.service.notice.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.service.notice.model.vo.Notice;

@Repository
public class NoticeDao {

	@Autowired
	private SqlSessionTemplate session;

	public int addNotice(Notice notice) throws Exception {
		return session.insert("notice.addNotice", notice);
	}
}
