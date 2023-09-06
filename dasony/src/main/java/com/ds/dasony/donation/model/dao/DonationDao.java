package com.ds.dasony.donation.model.dao;

import java.util.List;
import java.util.Map;

import org.apache.ibatis.session.SqlSession;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.ds.dasony.donation.model.vo.Donation;

@Repository
public class DonationDao {
	
	private SqlSessionTemplate session;
	
	@Autowired
	public DonationDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<Donation> selectDonaList() {
		return session.selectList("donationMapper.selectDonaList");
	}

	public Donation selectDonaDetail(int donaNo) {
		return session.selectOne("donationMapper.selectDonaDetail", donaNo);
	}

	public List<Donation> selectAdminDonaList() {
		return session.selectList("donationMapper.selectAdminDonaList");
	}

	public Donation selectAdDonaDetail(int donaNo) {
		return session.selectOne("donationMapper.selectAdDonaDetail", donaNo);
	}

//	public String insertDona(Donation donation) {
//		return session.insert("donationMapper.insertDona", donation);
//	}
	
	public String insertDona(Donation donation) {
		try {
            // Donation 객체를 데이터베이스에 삽입합니다.
			session.insert("donationMapper.insertDona", donation);
            // 삽입 성공 메시지를 반환합니다.
            return "게시글이 성공적으로 작성되었습니다.";
        } catch (Exception e) {
            // 데이터베이스 삽입 중 에러가 발생한 경우, 예외를 처리하거나 로깅할 수 있습니다.
            // 여기서는 간단히 에러 메시지만 반환합니다.
            return "게시글 삽입 중 에러가 발생했습니다.";
        }
	}


}
