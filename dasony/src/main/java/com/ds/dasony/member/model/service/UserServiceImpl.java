package com.ds.dasony.member.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.member.model.dao.UserDao;
import com.ds.dasony.member.model.vo.User;

@Service
public class UserServiceImpl implements UserService{

	private final UserDao userDao;
	
	@Autowired
	public UserServiceImpl(UserDao userDao) {
		this.userDao = userDao;
	}
	@Override
	public List<User> selectUserList() {
		return userDao.selectUserList();
	}
	@Override
	public int insertUser(User user) {
		return userDao.insertUser(user);
	}
	@Override
	public int chkValidateId(String userId) {
		return userDao.chkValidateId(userId);
	}
	@Override
	public int chkValidateNick(String userNick) {
		return userDao.chkValidateNick(userNick);
	}

}
