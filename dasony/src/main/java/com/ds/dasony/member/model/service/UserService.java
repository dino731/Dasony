package com.ds.dasony.member.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.member.model.vo.User;

public interface UserService {

	public List<User> selectUserList();

	public int insertUser(User user);

	public int chkValidateId(String userId);

	public int chkValidateNick(String userNick);

	public User login(Map<String, Object> userMap);

	public int location(String location, Long userNo);

	public User chkNo(String string);

}