package com.ds.dasony.member.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
		return session.selectList("memberMapper.selectUserList");
	}
	public int chkValidateId(String userId) {
		return session.selectOne("memberMapper.chkValidateId", userId);
	}
	public int chkValidateNick(String userNick) {
		return session.selectOne("memberMapper.chkValidateNick", userNick);
	}
	public int insertUser(User user) {
		return session.insert("memberMapper.insertUser", user);
	}
	public int location(Map<String, Object> request) {
		return session.update("memberMapper.location", request);
	}
	public User userForLocation(String userId) {
		return session.selectOne("memberMapper.userForLocation", userId);
	}
	public User login(Map userMap) {
		return session.selectOne("memberMapper.login", userMap);
	}
	public User findingId(String subEmail) {
		return session.selectOne("memberMapper.findingId", subEmail);
	}

}
