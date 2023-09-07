package com.ds.dasony.service.notice.model.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.service.notice.model.dao.NoticeDao;
import com.ds.dasony.service.notice.model.vo.Notice;

@Service
public class NoticeServiceImpl implements NoticeService {
	
	@Autowired
	NoticeDao nDao;

	@Override
	public int addNotice(Notice notice) throws Exception {
		return nDao.addNotice(notice);
	}

}
