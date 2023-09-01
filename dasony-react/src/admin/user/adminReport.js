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
        <div className="section_1">
        <div className="section_1_wrap">
          <div className="section_1_title">
            <span style={{fontsize: '4em'}}>신고관리</span>
          </div>
          <div className="section_1_content">
            <div className="report_list">
              <table align="center" className="list-area">
                <thead>
                  <tr style ={{width:"100%"}}>
                    <th style ={{width:"15%"}}>신고번호</th>
                    <th style ={{width:"25%"}}>아이디</th>
                    <th style ={{width:"40%"}}>신고제목</th>
                    <th style ={{width:"20%"}}>신고일</th>
                  </tr>
                </thead>
                <tbody>
                 
                  <tr onClick={godetail}>
                    <td>1</td>
                    <td>최미선</td>
                    <td>강퇴좀여</td>
                    <td>오늘</td>
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
                  <tr>
                    <td>5</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>6</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>7</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>8</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>9</td>
                    <td></td>
                    <td></td>
                    <td></td>
                  </tr>
                  <tr>
                    <td>10</td>
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
export default AdminReport;