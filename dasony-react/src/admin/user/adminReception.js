import './adminReport.css';
import { Link, useNavigate,useParams } from 'react-router-dom';
import React, { useRef,useEffect, useState } from 'react';

const AdminReception = () =>{

  const navigate = useNavigate(
  );
  const { receptionId } = useParams();

  
  const godetail = ()=>{
      navigate(
        "../admin/receptionDetail/${selectedReceptionId}"
      );
  };
  const [reception, setReception] = useState([]);
  const [selectedReceptionId, setSelectedReceptionId] = useState(null);
    useEffect(() => {
        const newReception = [{
            number :  1,
            name : '최정준',
            title : '포인트 어디서 얻나요?',
            date : '2023.09.04',
            content:'어디임?'
        },{
          number :  2,
          name : '최미선',
          title : '이벤트 추가해주세요',
          date : '2023.01.04',
          content:'이벤트 추가좀해라'
        }];
        setReception(newReception);
    
    },[]);
    
    return(
      <div className='section'>
            <h2>문의 관리</h2>
        <div className="section_1">
        <div className="section_1_wrap">
        
          <div className="section_1_content">
            <div className="report_list">
              <table align="center" className="list-area">
                <thead>
                  <tr style ={{width:"100%"}}>
                    <th style ={{width:"15%"}}>문의번호</th>
                    <th style ={{width:"25%"}}>문의자</th>
                    <th style ={{width:"40%"}}>문의 제목</th>
                    <th style ={{width:"20%"}}>문의 날짜</th>
                  </tr>
                </thead>
                <tbody>
                  {reception.map((item,index)=>(

                    <tr onClick={godetail} key={index}>
                    <td>{item.number}</td>
                    <td>{item.name}</td>
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
      </div>
    );

}
export default AdminReception;