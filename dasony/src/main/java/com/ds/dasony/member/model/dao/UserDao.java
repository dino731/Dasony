package com.ds.dasony.member.model.dao;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.apache.ibatis.annotations.Param;
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
	public User userInfo(long userNo) {
		return session.selectOne("memberMapper.userInfo", userNo);
	}

	
	public int updateUserPoint(@Param("userNo") long userNo, @Param("newDasonPoint") int newDasonPoint) {
		Map<String, Object> map = new HashMap<>();
		map.put("userNo", userNo);
		map.put("newDasonPoint", newDasonPoint);
	    return session.update("memberMapper.updateUserPoint", map);
	}
	
//	public List<User> getUserNames(List<Integer> userNo) {
//		return session.selectOne("memberMapper.getUserNames", userNo);
//	}

	public int userUpdate(User user) {
		return session.update("memberMapper.userUpdate", user);
	}
	public List<User> getMyInfo(int userNo) {
		return session.selectList("memberMapper.getMyInfo",userNo);
	}
	public int modifyMyInfo(Map<String, Object> myInfo) {
		int result = session.update("memberMapper.modifyMyInfo",myInfo);
		return result;
	}


}
