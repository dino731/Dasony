package com.ds.dasony.donation.controller;

import java.util.List;

import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.donation.model.service.DonationService;
import com.ds.dasony.donation.model.vo.Donation;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class DonationController {
	
	@Autowired
	private DonationService donationService;
	
	@GetMapping("/donalist")
	public List<Donation> selectDonaList(){
		
		List<Donation> DonaList = donationService.selectDonaList();
		log.info("donalist = {}", DonaList);
		
		return DonaList;
	}
	
	@GetMapping("/test")
	public int test() {
		return 100;
	}

}
