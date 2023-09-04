package com.ds.dasony.service.notice.controller;

import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.service.notice.model.vo.Notice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/notice")
public class NoticeController {

	@PostMapping("/addNotice")
	public String Test(@RequestBody Notice notice) {
		
		log.info(notice.getTitle());
		
		return notice.getTitle();
	}
}
