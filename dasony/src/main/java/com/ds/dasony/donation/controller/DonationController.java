package com.ds.dasony.donation.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.donation.model.service.DonationService;
import com.ds.dasony.donation.model.vo.Donation;
import com.ds.dasony.donation.model.vo.DonationList;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class DonationController {
	
	private final DonationService donationService;
	
	@Autowired
	public DonationController(DonationService donationService) {
		this.donationService = donationService;
	}
	
	@GetMapping("/donalist")
	public List<Donation> selectDonaList(HttpServletResponse response){
		
		List<Donation> donalist = donationService.selectDonaList();
//		log.info("donalist = {}", donalist);
		
		return donalist;
	}
	
	@GetMapping("/donadetail/{donaNo}")
	public Donation selectDonaDetail(
			@PathVariable int donaNo
			) {
			
		Donation donation = donationService.selectDonaDetail(donaNo);
		
//		log.info("donation = {}", donation);
		return donation;
	}
	
	@PostMapping("/api/getMyDonationList")
	public Map<String, Object> getMyDonationList(@RequestBody Map<String, Object> requestData) {
	    int userNo = (int) requestData.get("userNo");
	    Map<String, Object> response = new HashMap<>();
	    List<DonationList> donationList = donationService.getMyDonationList(userNo);
	    
	    response.put("donationList", donationList);
	    
	    return response;
	}
	
	
	
	
	
	
	
	
	
	
	
	
}
