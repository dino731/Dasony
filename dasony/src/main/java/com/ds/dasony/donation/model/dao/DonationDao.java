package com.ds.dasony.donation.model.dao;

import java.util.List;

import org.apache.ibatis.session.SqlSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.donation.model.vo.Donation;

@Repository
public class DonationDao {
	
	@Autowired
	private SqlSession sqlsession;

	public List<Donation> selectDonaList() {
		return sqlsession.selectList("donationMapper.selectDonaList");
	}

}
