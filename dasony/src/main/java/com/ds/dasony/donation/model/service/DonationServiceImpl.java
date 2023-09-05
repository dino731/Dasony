package com.ds.dasony.donation.model.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.donation.model.dao.DonationDao;
import com.ds.dasony.donation.model.vo.Donation;

@Service
public class DonationServiceImpl implements DonationService{
	
	@Autowired
	private DonationDao donationDao;

	@Override
	public List<Donation> selectDonaList() {
		return donationDao.selectDonaList();
	}

}
