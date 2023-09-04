import './adminReportDetail.css';
import { Link, useNavigate,useParams } from 'react-router-dom';
import React, { useRef,useEffect, useState } from 'react';
import AdminReception from './adminReception';

const AdminReceptionDetail = () => {

  const { receptionId } = useParams();

  const [reception, setReception] = useState({});

  return (
    <div className="section_1">
      <div className="section_1_wrap">
        
          <h2>문의 상세확인</h2>
       
        <div className="section_1_content">
          <div className="section1-1">
            <table id="detail-area" align="center" border="1">
              {reception.map((item,index)=>(
              <tbody key={index}>
                <tr >
                  <th style={{ width: '70px' }}>문의자</th>
                  <td style={{ width: '200px' }}>{item.name}</td>
                </tr>
                 
                <tr>
                  <th>작성일</th>
                  <td colSpan="3">{item.date}</td>
                </tr>
                <tr>
                  <th>문의 제목</th>
                  <td colSpan="3">{item.title}</td>
                </tr>
                <tr>
                  <th>내용</th>
                  <td colSpan="3">
                    <p style={{ height: '10em' }}>{item.content}</p>
                  </td>
                </tr>
              </tbody>
                 ))}
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
