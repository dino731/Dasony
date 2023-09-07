package com.ds.dasony.point.controller;

import javax.servlet.ServletContext;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ResourceLoader;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.ds.dasony.point.model.service.PointService;
import com.ds.dasony.point.model.vo.Point;
import lombok.extern.slf4j.Slf4j;

	
@Slf4j
@Controller
@RequestMapping("/api")
public class PointController {
	
	@Autowired
	private PointService pointService;
		
	@Autowired
	private ServletContext application;

	@Autowired
	private ResourceLoader resourceLoader;
	
	@PostMapping("/insertPoint")
	public  ResponseEntity<String> insertPoint(@RequestBody Point pointData){
		int result = pointService.insertPoint(pointData);
		int result2 = pointService.updateMemberTotalPoint(pointData);
		
		if (result> 0 && result2 >0) {
	        return ResponseEntity.ok("Success");
	    } else {
	        return ResponseEntity.badRequest().body("Failed");
	    }
		
	}



}
