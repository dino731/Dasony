import './adminReport.css';
import { Link, useNavigate } from 'react-router-dom';

const AdminReception = () =>{

  const navigate = useNavigate(
  );
  
  const godetail = ()=>{
      navigate(
        "../admin/receptionDetail"
      )
  };

    
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
                 
                  <tr onClick={godetail}>
                    <td>1</td>
                    <td>최정준</td>
                    <td>배고파요</td>
                    <td>2023.05.01</td>
                    </tr>
                  
                  <tr>
                    <td>2</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>3</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>4</td>
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
      </div>
    );

}
export default AdminReception;