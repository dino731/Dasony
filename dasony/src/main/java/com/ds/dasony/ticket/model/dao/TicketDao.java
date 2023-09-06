package com.ds.dasony.ticket.model.dao;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.ticket.model.vo.Ticket;

@Repository
public class TicketDao {

	@Autowired
	private SqlSessionTemplate session;
	
	public int insertTicket(Ticket ticketData) {
		return session.insert("ticket.insertTicket",ticketData);
	}
}
