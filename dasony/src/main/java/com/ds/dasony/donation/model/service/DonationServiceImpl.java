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

//	@Override
//	public String insertDona(Donation donation) {
//		
//		donation.setDonaTitle(donation.getDonaTitle());
//		donation.setDonaName(donation.getDonaName());
//		donation.setDonaTargetAmount(donation.getDonaTargetAmount());
//		donation.setDonaContent(donation.getDonaContent());
//		
//		return donationDao.insertDona(donation);
//	}
	
	 @Override
	    public String insertDona(Donation donation) {
	        try {
	            // Donation 객체를 데이터베이스에 저장하고, 결과를 받아옵니다.
	            String insertResult = donationDao.insertDona(donation);
	            // 성공적으로 삽입된 경우 결과를 반환합니다.
	            return insertResult;
	        } catch (Exception e) {
	            // 삽입 중 에러가 발생한 경우, 예외를 처리하거나 로깅할 수 있습니다.
	            // 여기서는 간단히 에러 메시지만 반환합니다.
	            return "게시글 삽입 중 에러가 발생했습니다.";
	        }
	    }


}
