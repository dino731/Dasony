// import '../../event/event.css';
import { useRef, useEffect, useState  } from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BoardInterestCategoryState, BoardJMTCategoryState, BoardFashionCategoryState, BoardLocalCategoryState, boardPostState } from '../../atoms';

const AdminBoardList = () =>{
    const navigate = useNavigate();
    const [selectedPath, setSelectedPath] = useState('');

    const [boardPost, setBoardPost] = useRecoilState(boardPostState);
    const boardInterestCategory = useRecoilValue(BoardInterestCategoryState);
    const boardJMTCategory = useRecoilValue(BoardJMTCategoryState);
    const boardFashionCategory = useRecoilValue(BoardFashionCategoryState);
    const boardLocalCategory = useRecoilValue(BoardLocalCategoryState);

    
    let generalList = [
        { name: '일상게시판', value: 'daily' },
        { name: '관심사게시판', value: 'interest' },
        { name: '맛집게시판', value: 'jmt' },
        { name: '패션게시판', value: 'fashion' },
        { name: '지역사회서비스', value: 'local' },
      ];
      
      // generalList 배열에서 value 프로퍼티만 추출하여 boardOptions에 저장
      let boardOptions = generalList.map(option => option.value);
      
      console.log('adBoardList boardOptions =>', boardOptions);
      
      const [mainCateSelect, setMainCateSelect] = useState([]);
      const handleMainCateChange = (e) => {
        const mainSelect = e.target.value;
        // const mainSelectCategory = boardCate.find(cat => cat.value === selectedValue);
        setMainCateSelect(mainSelect);   
        
      };
      console.log('adBoardList mainCateSelect 이거확인=>', mainCateSelect);

      const [listDailyCategory, setListDailyCategory] = useState([
        { name: '일상', value: 'AD01' },
        { name: '날씨', value: 'AD04' },
        { name: '투표', value: 'AD03' },
        { name: '쇼츠', value: 'AD02' },
    ]);
  
    const strDaily = 'daily';
    const strinterest = 'interest';
    const strJmt = 'jmt';
    const strFashion = 'fashion';
    const strLocal = 'local';

  
   const [listBoardCate, setListBoardCate] = useState([]);
   console.log('listBoardCate----->',listBoardCate);
   useEffect(() => {
    if (mainCateSelect == strDaily) {
     setListBoardCate(listDailyCategory);
    } else if (mainCateSelect == strinterest) {
     setListBoardCate(boardInterestCategory);
    } else if (mainCateSelect == strJmt) {
     setListBoardCate(boardJMTCategory);
    } else if (mainCateSelect == strFashion) {
     setListBoardCate(boardFashionCategory);
    } else if(mainCateSelect == strLocal){
     setListBoardCate(boardLocalCategory);
    } else{
     setListBoardCate([]);
    }
  }, [mainCateSelect]);
  console.log('adBoardList listBoardCate =>',listBoardCate);

  const [cateItem, setCateItem] = useState([]);
  const handleCateChange = (e) => {
    const selectCateItem = e.target.value;
    setCateItem(selectCateItem);

  }


  /* 체크박스 Select All 관련 */
  const [selectAllChecked, setSelectAllChecked] = useState(false); // 모두 선택 체크 상태를 관리하는 상태 추가
  function selectAll() {
    const checkboxes = document.getElementsByName('ckeck');
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !selectAllChecked; // 모두 선택 체크 상태를 반전
    });
    setSelectAllChecked(!selectAllChecked); // 모두 선택 체크 상태 업데이트
  }
  



    /** 이벤트 아이템 클릭시 해당 페이지로 이동 */
    const moveToEventDetail = no => {
         navigate(`/admin/event/detail/${no}`);
    };

    

  return(
      <div className="board-admin-boardList dragging">
          <div className="mb-3 row">
              <div className="board-category-selectBoxList">
                  <div className="board-selectBox">
                      <span className='board-selectBox-cate-title'>대분류</span>
                      <span className="col-md-9 BoardList-head-title-text">
                                <select className='boardListSelect' value={mainCateSelect.toString()} onChange={handleMainCateChange} >
                                <option value=''>게시판 선택</option>
                                {generalList.map((option, index) => (
                                    <option key={index} value={option.value}>{option.name}</option>
                                ))}
                                </select>
                            </span>
                      
                    </div>
                  
                  <div className="board-selectBox">
                        <span  className='board-selectBox-cate-title'>소분류</span>
                        <span className="col-md-9 BoardList-head-title-text">
                    
                        {/* onChange={handlePathChange} */}
                            <select className='boardListSelect' value={cateItem} onChange={handleCateChange}>
                            <option value=''>카테고리 선택</option>
                            {listBoardCate.map((option, index) => (
                                <option key={index} value={option.value}>{option.name}</option>
                            ))}
                            </select>
                        </span>
                  </div>
              </div>
              {/* <input type='text' style={{width: "50%"}} ></input><button style={{width: "10%"}}>검색</button> */}
              <div className='board-admin-writer-wrapper' >
                <button className='board-admin-writer-btn' style={{width: "10%"}} onClick={()=>navigate("/admin/board/new")}>공지등록</button>
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
                      <th scope="col" width="8%;">안내</th>
                      <th scope="col" width="8%;">삭제</th>
                  </tr>
              </thead>
              <tbody>
                {
                boardPost.length > 0 && listBoardCate.length > 0 && boardPost.filter((board) => {
                return listBoardCate.some((category) => category.name === board.boardCateNo);})
                .map( (board, index)=>(    
                    <tr key={index} className="notice-item">
                        <th scope="col" width="5%;"><input type='checkbox' name='ckeck'/></th>
                        <td scope="row">{board.BoardNo}</td>
                        <td>{board.boardCateNo}</td>
                        <td className="text-cut" onClick={()=>moveToEventDetail(1)}>{board.boardTitle}</td>
                        <td scope="row">{board.userName}</td>
                        <td scope="row">{board.boardWriteDate}</td>
                        <td scope="row">Y</td>
                        <td scope="row"><button>안내</button></td>
                        <td scope="row"><button onClick={()=>navigate("/admin/board/delete")} >삭제</button></td>
                    </tr>
                    ))
                }
                    <tr className="notice-item">
                        <th scope="col" width="5%;"><input type='checkbox' name='ckeck'/></th>
                        <td scope="row">1</td>
                        <td>일상</td>
                        <td className="text-cut" onClick={()=>moveToEventDetail(1)}>나 자신 화이팅</td>
                        <td scope="row">박지현</td>
                        <td scope="row">2023-09-03</td>
                        <td scope="row">Y</td>
                        <td scope="row"><button>안내</button></td>
                        <td scope="row"><button onClick={()=>navigate("/admin/board/delete")}>삭제</button></td>
                    </tr>
              </tbody>
              <tfoot>
              </tfoot>
          </table>        
        </div>
  );
};
export default AdminBoardList;