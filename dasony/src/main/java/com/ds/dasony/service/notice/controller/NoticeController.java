package com.ds.dasony.service.notice.controller;

import java.io.Console;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.service.notice.model.service.NoticeService;
import com.ds.dasony.service.notice.model.vo.Notice;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/notice")
public class NoticeController {
	
	@Autowired
	private NoticeService nService;

	@PostMapping("/addNotice")
	public String addNotice(@RequestBody Notice notice) {
		log.info(notice.toString());
		try {
			int result = nService.addNotice(notice);
			
			if(result>0) return "성공적으로 등록하였습니다.";
			else return "다시 등록해주세요.";
		} catch (Exception e) {
			return "예상치 못한 에러가 발생했습니다. 다시 시도해주세요.";
		}
	}
}
