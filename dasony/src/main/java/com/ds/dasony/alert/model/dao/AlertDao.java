package com.ds.dasony.alert.model.dao;


import java.util.List;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;


import com.ds.dasony.alert.model.vo.Alert;


import lombok.extern.slf4j.Slf4j;

@Slf4j


@Repository
public class AlertDao {
	
	@Autowired
	private SqlSessionTemplate session;
	

	public List<Alert> getAlertList(int userNo){
		log.info("ㅎㅇ"+userNo);
		List<Alert> result = session.selectList("alert.getAlertList",userNo);

	}

}
