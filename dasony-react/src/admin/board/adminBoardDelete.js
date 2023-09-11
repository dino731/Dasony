import './adminBoard.css';
import React, { useState } from 'react'; // React와 useState 추가

const AdminBoardDelete = () => {
  const [selectAllChecked, setSelectAllChecked] = useState(false); // 모두 선택 체크 상태를 관리하는 상태 추가

  function selectAll() {
    const checkboxes = document.getElementsByName('ckeck');

    checkboxes.forEach((checkbox) => {
      checkbox.checked = !selectAllChecked; // 모두 선택 체크 상태를 반전
    });

    setSelectAllChecked(!selectAllChecked); // 모두 선택 체크 상태 업데이트
  }

  return(
    <>
      <div className="board-admin-boardList-wrapper">
          <div className="mb-3 row">
              <div className="board-category-selectBoxList">
                  <div className="board-selectBox">
                      <span className='adBoard-delete-title'>게시글 삭제</span>
                      <span className="adBoard-cancel-btn-box"><button>취소</button></span>
                      <span className="adBoard-delete-btn-box"><button>삭제</button></span>
                    </div>
              </div>
          </div>

          {/* * 이벤트 리스트에 필요한 것 : 이벤트 번호, 분류, 제목, 등록일, 남은일, 쪽지 발송 */}
          <table className="table" style={{"tableLayout":"fixed"}}>
              <thead>
                  <tr>
                      <th scope="col" width="5%;">
                        <input type='checkbox'
                         value='selectall'
                         checked={selectAllChecked} // 모두 선택 체크 상태 반영
                         onChange={selectAll} // 모두 선택 체크 상태 변경 핸들러 연결
                        />

                        </th>
                      
                      <th scope="col" width="5%;">No</th>
                      <th scope="col" width="10%;">게시판</th>
                      <th scope="col" width="25%;">제목</th>
                      <th scope="col" width="25%;">작성자</th>
                      <th scope="col" width="10%;">등록일</th>
                      <th scope="col" width="7%;">상태</th>
                  </tr>
              </thead>
              <tbody>
                    <tr className="notice-item">
                        <td scope="row" width="5%;"><input type='checkbox' name='ckeck'/></td>
                        <td scope="row">1</td>
                        <td>일상</td>
                        <td className="text-cut">나 자신 화이팅</td>
                        <td scope="row">박지현</td>
                        <td scope="row">2023-09-03</td>
                        <td scope="row">Y</td>
                    </tr>
                    <tr className="notice-item">
                        <td scope="row" width="5%;"><input type='checkbox' name='ckeck'/></td>
                        <td scope="row">1</td>
                        <td>일상</td>
                        <td className="text-cut">나 자신 화이팅</td>
                        <td scope="row">박지현</td>
                        <td scope="row">2023-09-03</td>
                        <td scope="row">Y</td>
                    </tr>
                    <tr className="notice-item">
                        <td scope="row" width="5%;"><input type='checkbox' name='ckeck'/></td>
                        <td scope="row">1</td>
                        <td>일상</td>
                        <td className="text-cut">나 자신 화이팅</td>
                        <td scope="row">박지현</td>
                        <td scope="row">2023-09-03</td>
                        <td scope="row">Y</td>
                    </tr>
              </tbody>
              <tfoot>
              </tfoot>
          </table>        
        </div>
    </>
  )

}
export default AdminBoardDelete;