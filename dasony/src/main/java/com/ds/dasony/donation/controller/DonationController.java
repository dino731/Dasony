package com.ds.dasony.donation.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.donation.model.service.DonationService;
import com.ds.dasony.donation.model.vo.Donation;

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

}
