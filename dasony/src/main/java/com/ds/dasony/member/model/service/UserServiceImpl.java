package com.ds.dasony.member.model.service;

import java.util.List;
import java.util.Map;

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
	public int chkValidateId(String userId) {
		return userDao.chkValidateId(userId);
	}
	@Override
	public int chkValidateNick(String userNick) {
		return userDao.chkValidateNick(userNick);
	}
	@Override
	public int insertUser(User user) {
		return userDao.insertUser(user);
	}

	@Override
	public int location(Map<String, Object> request) {
		return userDao.location(request);
	}
	@Override
	public User userForLocation(String userId) {
		return userDao.userForLocation(userId);
	}
	@Override
	public User login(Map userMap) {
		return userDao.login(userMap);
	}
	@Override
	public User findingId(String subEmail) {
		return userDao.findingId(subEmail);
	}
	@Override
	public User userInfo(long userNo) {
		return userDao.userInfo(userNo);
	}
	@Override
	public int userUpdate(User user) {
		return userDao.userUpdate(user);
	}
	@Override
	public List<User> getMyInfo(int userNo){
		return userDao.getMyInfo(userNo);
	}
	@Override
	public int modifyMyInfo(Map<String, Object> myInfo) {
		return userDao.modifyMyInfo(myInfo);
	}
	@Override
	public int changeNewPwd(Map<String,Object> pwdInfo) {
		return userDao.changeNewPwd(pwdInfo);
	}
	@Override
	public List getMyLikesList(int userNo){
		return userDao.getMyLikesList(userNo);
	}

}
