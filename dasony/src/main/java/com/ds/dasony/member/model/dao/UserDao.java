package com.ds.dasony.member.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.member.model.vo.User;

@Repository
public class UserDao {

	private SqlSessionTemplate session;
	@Autowired
	public UserDao (SqlSessionTemplate session) {
		this.session = session;
	}
	public List<User> selectUserList() {
		return session.selectList("user.selectUserList");
	}

}
