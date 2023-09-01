import React from 'react';
import './adminReportDetail.css';
import { Link } from 'react-router-dom';

const AdminReportDetail = () => {
  return (
    <div className="section_1">
      <div className="section_1_wrap">
        
          <h2>신고 상세확인</h2>
        
        <div className="section_1_content">
          <div className="section1-1">
            <table id="detail-area" align="center" border="1">
              <tbody>
                <tr>
                  <th style={{ width: '70px' }}>신고자</th>
                  <td style={{ width: '200px' }}>최정준
                  </td>
                  <th style={{ width: '70px' }}>신고 대상</th>
                  <td style={{ width: '200px' }}>최미선
                  </td>
                </tr>
                <tr>
                  <th>작성일</th>
                  <td colSpan="3">2021.05.01</td>
                </tr>
                <tr>
                  <th>제목</th>
                  <td colSpan="3">신고합니다.</td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td colSpan="3">
                    <p style={{ height: '10em' }}>저한테 욕했어요</p>
                  </td>
                </tr>
              
              </tbody>
            </table>
          </div>
          <br />
          <div className="section1-2" align="center">
            <button className="btn btn-secondary"><Link to={'../admin/report'}>목록</Link></button>
            <button className="btn btn-primary" id="acceptButton">접수</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReportDetail;
