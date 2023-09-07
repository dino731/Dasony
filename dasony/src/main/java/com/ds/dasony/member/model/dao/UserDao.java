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
	public int insertUser(User user) {
		return session.insert("memberMapper.insertUser", user);
	}
	public int chkValidateId(String userId) {
		return session.selectOne("memberMapper.chkValidateId", userId);
	}
	public int chkValidateNick(String userNick) {
		return session.selectOne("memberMapper.chkValidateNick", userNick);
	}
	public User login(Map userMap) {
		return session.selectOne("memberMapper.login", userMap);
	}
	public int location(String location, Long userNo) {
		Map<String, Object> map = new HashMap();
		map.put("location", location);
		map.put("userNo", userNo);
		return session.update("memberMapper.location", location);
	}
	public User chkNo(String userId) {
		return session.selectOne("memberMapper.chkNo", userId);
	}

}
