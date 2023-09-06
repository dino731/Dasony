package com.ds.dasony.donation.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.donation.model.vo.Donation;

public interface DonationService {

	List<Donation> selectDonaList();

	Donation selectDonaDetail(int donaNo);

	List<Donation> selectAdminDonaList();

	Donation selectAdDonaDetail(int donaNo);

	String insertDona(Donation donation);


}
