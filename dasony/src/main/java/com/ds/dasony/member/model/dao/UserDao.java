package com.ds.dasony.member.model.dao;

import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.member.model.vo.User;

import lombok.extern.slf4j.Slf4j;

@Slf4j
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
	public int insertUser(User user) {
		return session.insert("user.insertUser", user);
	}
	public int chkValidateId(String userId) {
		return session.selectOne("user.chkValidateId", userId);
	}
	public int chkValidateNick(String userNick) {
		return session.selectOne("user.chkValidateNick", userNick);
	}

}
