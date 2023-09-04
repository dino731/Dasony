import './adminReport.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useRef,useEffect, useState } from 'react';

const AdminReport = () =>{

  const navigate = useNavigate(
  );
  
  const godetail = ()=>{
      navigate(
        "../admin/reportDetail"
      )
  };

  const [report, setReport] = useState([]);

    useEffect(() => {
        const newReport = [{
            number :  1,
            toName : '최정준',
            fromName : '최미선',
            title : '욕설신고',
            date : '2023.09.04'
        },{
          number :  2,
          toName : '최미선',
          fromName : '최정준',
          title : '광고 신고',
          date : '2023.01.04'
        }];
        setReport(newReport);
    
    },[]);
    
    return(
      <div className='section'>
            <h2>신고 관리</h2>
        <div className="section_1">
        <div className="section_1_wrap">
          
          
            <div className="report_list">
              <table align="center" className="list-area">
                <thead>
                  <tr style ={{width:"100%"}}>
                    <th style ={{width:"10%"}}>신고번호</th>
                    <th style ={{width:"15%"}}>신고 대상</th>
                    <th style ={{width:"15%"}}>신고자</th>
                    <th style ={{width:"40%"}}>신고제목</th>
                    <th style ={{width:"20%"}}>신고일</th>
                  </tr>
                </thead>
                <tbody>
                {report.map((item,index)=>(
                  <tr onClick={godetail} key={index}>
                    <td>{item.number}</td>
                    <td>{item.toName}</td>
                    <td>{item.fromNameName}</td>
                    <td>{item.title}</td>
                    <td>{item.date}</td>
                    </tr>
                     ))}
                </tbody>
              </table>
              <br /><br />

              <div align="center" className="paging-area">
                <button>&lt;</button>
                <button>1</button>
                <button>2</button>
                <button>3</button>
                <button>4</button>
                <button>5</button>
                <button>6</button>
                <button>7</button>
                <button>8</button>
                <button>9</button>
                <button>10</button>
                <button>&gt;</button>
              </div>
            </div>
          </div>
        
      </div>
      </div>
    );

}
export default AdminReport;