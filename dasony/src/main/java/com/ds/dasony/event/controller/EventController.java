package com.ds.dasony.event.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.event.model.service.EventService;
import com.ds.dasony.event.model.vo.Event;
import com.ds.dasony.event.model.vo.EventForm;
import com.ds.dasony.event.model.vo.FileUpload;
import com.ds.dasony.event.model.vo.Reward;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/event")
public class EventController {

	@Autowired
	private EventService eService;
	@Autowired
	FileUpload fileUpload;
	
	@GetMapping("/loadList")
	public List<Event> selectAllEvent(@RequestParam("category") String category, @RequestParam("status") String status ){
		Map<String, Object> param = new HashMap<>();
		param.put("category", category);
		param.put("status", status);
		
		List<Event> list = eService.selectAllEvent(param);
		log.info("search Param : "+param.toString());
		log.info("조회된 데이터 : "+list);
		
		return list;
	}
	
	@GetMapping("/selectEvent")
	public Map<String, Object> selectEventDetail(@RequestParam String no){
		Map<String, Object> map = new HashMap();
		map.put("event", eService.selectEvent(no));
		map.put("reward", eService.selectReward(no));
		
		log.info("map : " + map.toString());
		
		return map;
	}
	
	@PostMapping(value= {"/uploadEvent", "/updateEvent"})
	public String upEvent(EventForm eventForm, HttpServletRequest request) {
		
		String filePath;
		Event event = null;
		Reward reward = null;
		// reward 여러개 담을 리스트
		List<Reward> list = new ArrayList();
		// event, reward 하나로 묶는 객체
		HashMap<String, Object> map = new HashMap();
		// 정보 수정 / 이벤트 추가 서비스 구분
		String serviceKind = "";
		String response = "";

		log.info(eventForm.toString());
		
		try {
			filePath = fileUpload.uploadFile(eventForm.getThumbFile(), request, "event");
		} catch (IOException e) {
			e.printStackTrace();
			response = "업로드 과정에서 문제가 발생했습니다. 다시 시도해주세요.";
			return response;
		}
		

		if(eventForm.getNo()!=null && !eventForm.getNo().equals("undefined")) {
			// update logic
			event = Event.builder().no(eventForm.getNo())
									.title(eventForm.getTitle())
									.content(eventForm.getContent())
									.startDate(eventForm.getStartDate())
									.endDate(eventForm.getEndDate())
									.winnerDate(eventForm.getWinnerDate())
									.videoLink(eventForm.getVideoLink())
									.detailLink(eventForm.getDetailLink())
									.pageLink(eventForm.getPageLink())
									.eventCategory(eventForm.getEventCategory())
									.winTime(eventForm.getWinTime())
									.thumbnail(filePath).build();
			
			for(int i=0; i<eventForm.getAmount().size(); i++) {
				reward = Reward.builder().rewardNo(Integer.parseInt(eventForm.getRewardNo().get(i)))
					.rewardName(eventForm.getRewardName().get(i))
					.brand(eventForm.getBrand().get(i))
					.rank(Integer.parseInt(eventForm.getRank().get(i)))
					.amount(Integer.parseInt(eventForm.getAmount().get(i)))
					.rewardRange(eventForm.getRewardRange().get(i))
					.rewardCategory(eventForm.getRewardCategory().get(i))
					.eventNo(eventForm.getNo()).build();
				
				list.add(i, reward);
			}
			
			serviceKind = "update";
		} else {
			// insert logic
			event = Event.builder()
								.title(eventForm.getTitle())
								.content(eventForm.getContent())
								.startDate(eventForm.getStartDate())
								.endDate(eventForm.getEndDate())
								.winnerDate(eventForm.getWinnerDate())
								.videoLink(eventForm.getVideoLink())
								.detailLink(eventForm.getDetailLink())
								.pageLink(eventForm.getPageLink())
								.eventCategory(eventForm.getEventCategory())
								.winTime(eventForm.getWinTime())
								.thumbnail(filePath).build();

			for(int i=0; i<eventForm.getAmount().size(); i++) {
				reward = Reward.builder()
									.rewardName(eventForm.getRewardName().get(i))
									.brand(eventForm.getBrand().get(i))
									.rank(Integer.parseInt(eventForm.getRank().get(i)))
									.amount(Integer.parseInt(eventForm.getAmount().get(i)))
									.rewardRange(eventForm.getRewardRange().get(i))
									.rewardCategory(eventForm.getRewardCategory().get(i))
									.eventNo(eventForm.getNo()).build();
				
				list.add(i, reward);
			}
			serviceKind = "insert";
		}
		
		map.put("event", event);
		map.put("reward", list);
		
		log.info("data : " + event.toString());
		log.info("data : " + reward.toString());
		
		// 쿼리 수행 결과값
		int result = 0;
		
		switch(serviceKind) {
		case "update" : result = eService.updateEvent(map); break;
		case "insert" : result = eService.insertEvent(map); break;
		}
		
		switch(result) {
		case 0: response = "다시 시도해주세요"; break;
		case 1: response = "성공적으로 완료했습니다."; break;
		}
		
		
		return response;
	}
}
