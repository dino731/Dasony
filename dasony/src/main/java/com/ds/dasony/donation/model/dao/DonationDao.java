package com.ds.dasony.donation.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.donation.model.vo.Donation;

@Repository
public class DonationDao {
	
	private SqlSessionTemplate session;
	
	@Autowired
	public DonationDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<Donation> selectDonaList() {
		return session.selectList("donationMapper.selectDonaList");
	}

	public Donation selectDonaDetail(int donaNo) {
		return session.selectOne("donationMapper.selectDonaDetail", donaNo);
	}

	public List<Donation> selectAdminDonaList() {
		return session.selectList("donationMapper.selectAdminDonaList");
	}

	public Donation selectAdDonaDetail(int donaNo) {
		return session.selectOne("donationMapper.selectAdDonaDetail", donaNo);
	}

//	public String insertDona(Donation donation) {
//		return session.insert("donationMapper.insertDona", donation);
//	}
	
	public int insertDona(Donation donation) throws Exception{
		return session.insert("donationMapper.insertDona", donation);
	}

	public int updateDona(Donation donation) throws Exception{
		return session.update("donationMapper.updateDona", donation);
	}
}