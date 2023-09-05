package com.ds.dasony.member.model.service;

import java.util.List;

import com.ds.dasony.member.model.vo.User;

public interface UserService {

	public List<User> selectUserList();

	public int insertUser(User user);

	public int chkValidateId(String userId);

	public int chkValidateNick(String userNick);

}
