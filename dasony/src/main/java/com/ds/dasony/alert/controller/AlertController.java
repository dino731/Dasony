package com.ds.dasony.alert.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import java.util.Map;

import javax.servlet.ServletContext;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;


import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.alert.model.service.AlertService;
import com.ds.dasony.alert.model.vo.Alert;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api") // 공통주소
public class AlertController {
	
	@Autowired
	private AlertService alertService;
	
	@Autowired
	private ServletContext application;

	@Autowired
	private ResourceLoader resourceLoader;
	

	@PostMapping("/getAlertList")
	public Map<String,Object> getAlertList(@RequestBody Map<String, Object> requestData){
	    int userNo = (int) requestData.get("userNo");
	    
	    Map<String,Object> alertList = new HashMap();
	    alertList.put("alertList",alertService.getAlertList(userNo));
        
	    return alertList;
	}
	
	
	
	

}
