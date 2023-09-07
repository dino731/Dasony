package com.ds.dasony.donation.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.donation.model.dao.DonationDao;
import com.ds.dasony.donation.model.vo.Donation;

@Service
public class DonationServiceImpl implements DonationService{
	
	private final DonationDao donationDao;
	
	@Autowired
	public DonationServiceImpl(DonationDao donationDao) {
		this.donationDao = donationDao;
	}

	@Override
	public List<Donation> selectDonaList() {
		return donationDao.selectDonaList();
	}

	@Override
	public Donation selectDonaDetail(int donaNo) {
		return donationDao.selectDonaDetail(donaNo);
	}

	@Override
	public List<Donation> selectAdminDonaList() {
		return donationDao.selectAdminDonaList();
	}

	@Override
	public Donation selectAdDonaDetail(int donaNo) {
		return donationDao.selectAdDonaDetail(donaNo);
	}
	
	 @Override
	    public int insertDona(Donation donation) throws Exception{
		return donationDao.insertDona(donation);
	 }

	@Override
	public int updateDona(Donation donation) throws Exception {
		return donationDao.updateDona(donation);
	}
	
	@Override
	public int deleteDona(int donaNo) {
		return donationDao.deleteDona(donaNo);
	}
	
//	@Override
//	public int selectUserDason(int userNo) throws Exception{
//		return donationDao.selectUserDason(userNo);
//	}
}
