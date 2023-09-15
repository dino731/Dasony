import './adminReportDetail.css';
import { Link, useNavigate,useParams } from 'react-router-dom';
import React, { useRef,useEffect, useState } from 'react';
import AdminReception from './adminReception';

const mypageReception = () => {

  const { receptionId } = useParams();

  const [reception, setReception] = useState({});

  return (
    <div className="section_1">
      <div className="section_1_wrap">
        
          <h2>문의 하기</h2>
       
        <div className="section_1_content">
          <div className="section1-1">
            <table id="detail-area" align="center" border="1">

              <tbody key={index}>
                <tr>
                  <th style={{ width: '70px' }}></th>
                  <td style={{ width: '200px' }}></td>
                </tr>
                <tr>
                  <th>작성일</th>
                  <td colSpan="3"></td>
                </tr>
                <tr>
                  <th>문의 제목</th>
                  <td colSpan="3"></td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td colSpan="3">
                    <p style={{ height: '10em' }}></p>
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

export default mypageReception;
