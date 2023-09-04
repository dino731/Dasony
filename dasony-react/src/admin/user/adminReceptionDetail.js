import React from 'react';
import './adminReportDetail.css';
import { Link } from 'react-router-dom';

const AdminReceptionDetail = () => {
  return (
    <div className="section_1">
      <div className="section_1_wrap">
        
          <h2>문의 상세확인</h2>
       
        <div className="section_1_content">
          <div className="section1-1">
            <table id="detail-area" align="center" border="1">
              <tbody>
                <tr>
                  <th style={{ width: '70px' }}>문의자</th>
                  <td style={{ width: '200px' }}>최정준</td>

                </tr>
                <tr>
                  <th>작성일</th>
                  <td colSpan="3">2023.08.01</td>
                </tr>
                <tr>
                  <th>문의 제목</th>
                  <td colSpan="3">포인트 어떻게 얻어요?</td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td colSpan="3">
                    <p style={{ height: '10em' }}>내용들</p>
                  </td>
                </tr>
                
              </tbody>
            </table>
          </div>
          <br />
          <div className="section1-2" align="center">
            <button className="btn btn-secondary"><Link to={'../admin/reception'}>목록</Link></button>
            <button className="btn btn-primary" id="acceptButton">접수</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminReceptionDetail;
