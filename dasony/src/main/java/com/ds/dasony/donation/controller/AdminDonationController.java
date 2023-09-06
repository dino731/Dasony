package com.ds.dasony.donation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.donation.model.service.DonationService;
import com.ds.dasony.donation.model.vo.Donation;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AdminDonationController {
	
	private final DonationService donationService;

	@Autowired
	public AdminDonationController(DonationService donationService) {
		this.donationService = donationService;
	}
	
	@GetMapping("/admindonalist")
	public List<Donation> selectAdminDonaList(){
		List<Donation> adDonaList = donationService.selectAdminDonaList();
		
//		log.info("adDonaList = {}", adDonaList);
		
		return adDonaList;
	}
	
	@GetMapping("/admindonadetail/{donaNo}")
	public Donation selectAdDonaDetail(
			@PathVariable int donaNo
			) {
		
		Donation adDonation = donationService.selectAdDonaDetail(donaNo);
		
		return adDonation;
	}
	
//	@PostMapping("/admindonaenroll")
//	public String insertDona(
//			Donation donation,
//			@RequestParam String selectedArea
//			) {
//		
//		donation.setDonaExecuteDate(selectedArea);
//		
//		String insertDonation = donationService.insertDona(donation);
//		
//		return insertDonation;
//	}
	
	@PostMapping("/admindonaenroll/")
    public ResponseEntity<String> insertDona(@RequestBody Donation donation, @RequestParam String selectedArea) {
        try {
            // Donation 객체에 selectedArea와 기타 필요한 속성 설정
            donation.setDonaExecuteDate(selectedArea);
            // 다른 속성 설정
            
            // 데이터베이스에 저장하는 서비스 메서드 호출
            String insertDonationResult = donationService.insertDona(donation);
            
            // 성공적인 응답 반환
            return ResponseEntity.ok(insertDonationResult);
        } catch (Exception e) {
            // 에러가 발생한 경우 에러 응답 반환
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("게시글 작성 중 오류가 발생했습니다.");
        }
    }
	

}
