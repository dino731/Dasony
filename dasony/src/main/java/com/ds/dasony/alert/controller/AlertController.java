package com.ds.dasony.alert.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;

import com.ds.dasony.alert.model.service.AlertService;
import com.ds.dasony.alert.model.vo.Alert;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Controller
@RequestMapping("/api") // 공통주소
public class AlertController {
	
	@Autowired
	private AlertService alertService;
	
	@Autowired
	private ServletContext application;

	@Autowired
	private ResourceLoader resourceLoader;
	
	@GetMapping("/getalertList")
	public List<Alert> getAlertList(@RequestParam long userNo){
		List<Alert> alertList = alertService.getAlertList(userNo);
	return alertList;
	}
	
	
	
	

}
