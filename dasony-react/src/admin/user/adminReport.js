import './adminReport.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminReport = () =>{

  const navigate = useNavigate(
  );
  
  const godetail = ()=>{
      navigate(
        "../admin/reportDetail"
      )
  };

    
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
                 
                  <tr onClick={godetail}>
                    <td>1</td>
                    <td>최미선</td>
                    <td>최정준</td>
                    <td>욕설</td>
                    <td>2023.09.01</td>
                    </tr>
                  
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  
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