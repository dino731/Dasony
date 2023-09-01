import React from 'react';
import './adminReportDetail.css';
import { Link } from 'react-router-dom';

const AdminReportDetail = () => {
  return (
    <div className="section_1">
      <div className="section_1_wrap">
        <div className="section_1_title">
          <span style={{ fontSize: '4em' }}>신고상세확인</span>
        </div>
        <div className="section_1_content">
          <div className="section1-1">
            <table id="detail-area" align="center" border="1">
              <tbody>
                <tr>
                  <th style={{ width: '70px' }}>신고자</th>
                  <td
                    style={{ width: '200px' }}
                  >
                    아무나
                  </td>
                  <th style={{ width: '70px' }}>대상자</th>
                  <td
                    style={{ width: '200px' }}
                  >
                    대상자
                  </td>
                </tr>
                <tr>
                  <th>작성일</th>
                  <td colSpan="3"></td>
                </tr>
                <tr>
                  <th>제목</th>
                  <td colSpan="3"></td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td colSpan="3">
                    <p style={{ height: '10em' }}></p>
                  </td>
                </tr>
                <tr>
                  <th>첨부파일</th>
                  <td colSpan="3">첨부파일</td>
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
