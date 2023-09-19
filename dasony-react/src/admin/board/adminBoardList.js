// import '../../event/event.css';
import { useRef, useEffect, useState  } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue } from 'recoil';
import { BoardInterestCategoryState, BoardJMTCategoryState, BoardFashionCategoryState, BoardLocalCategoryState, boardPostState } from '../../atoms';
import axios from 'axios';


const AdminBoardList = () =>{
    const navigate = useNavigate();
    const [selectedPath, setSelectedPath] = useState('');

    const [boardPost, setBoardPost] = useRecoilState(boardPostState);
    const boardInterestCategory = useRecoilValue(BoardInterestCategoryState);
    const boardJMTCategory = useRecoilValue(BoardJMTCategoryState);
    const boardFashionCategory = useRecoilValue(BoardFashionCategoryState);
    const boardLocalCategory = useRecoilValue(BoardLocalCategoryState);

    const[adminBList, setAdminBList]= useState([]);
     /* axios 시작 */
    useEffect(() => {
      // Axios를 사용하여 서버로 GET 요청을 보냅니다.
      axios.get(`http://localhost:3000/dasony/adminBoard/boardList`) // 서버의 API 엔드포인트에 맞게 수정
        .then((response) => {
          console.log('BoardList 응답 데이터:', response.data);
          setAdminBList(response.data);
        })
        .catch((error) => {
          console.error('서버 요청 오류:', error);
        });
    }, []);
    console.log('게시판리스트 boardData ===>',adminBList);

    
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

  const [cateItem, setCateItem] = useState('');
  const handleCateChange = (e) => {
    const selectCateItem = e.target.value;
    setCateItem(selectCateItem);

  };

  const [categorySelectAllCkecked, setCategorySelectAllChecked] = useState([]);


  /* 체크박스 Select All 관련 */
  const [selectAllChecked, setSelectAllChecked] = useState(false); // 모두 선택 체크 상태를 관리하는 상태 추가
  function selectAll() {
    const checkboxes = document.getElementsByName('ckeck');
    if (!selectAllChecked) {
      const allBoardNos = adminBList.filter((board) => {
        return listBoardCate.some((category) => category.name === board?.boardCate.boardSmallCate);}).map((board) => board.boardNo);
      setSelectedItems(allBoardNos);
    } else {
      setSelectedItems([]);
    }

    const updateCategorySelectAllChecked = {};
    listBoardCate.forEach((category)=>{
      updateCategorySelectAllChecked[category.value] = !selectAllChecked;
    });
    setCategorySelectAllChecked(updateCategorySelectAllChecked);
    
    checkboxes.forEach((checkbox) => {
      checkbox.checked = !selectAllChecked; // 모두 선택 체크 상태를 반전 
    });
    setSelectAllChecked(!selectAllChecked); // 모두 선택 체크 상태 업데이트
  }


  const [selectedItems, setSelectedItems] = useState([]);

  function handleCheckboxChange(event) {
    console.log(event);
    const value = event.target.defaultValue; // boardNo 값 추출
    if (event.target.checked) {
      setSelectedItems([...selectedItems, value]);
    } else {
      setSelectedItems(selectedItems.filter(item => item !== value));
    }
  };
  console.log('체크 값 selectedItems',selectedItems);

  const handleDeleteList = ()=> {

    if(selectedItems.length == 0){
      alert('삭제할 게시글을 선택하세요');
      return;
    }
    
    // formData.append(`boardNo`, selectedItems);
    const requestPromises = selectedItems.map((item) => {
      const formData = new FormData();
      formData.append(`boardNo`, item);

      for (let key of formData.keys()) {
        console.log('FormData의 key 확인', key);
      }
      for (let value of formData.values()) {
        console.log(' FormData의 value 확인', value);
      }
      return axios.post(`http://localhost:3000/dasony/adminBoard/addMinBoardDelete`, formData);
    });

  
    Promise.all(requestPromises)
    .then((response) => {
      console.log('BoardList 응답 데이터:', response.data);
      setSelectedItems([]);
      window.location.href =`/admin/board`;

    })
    .catch((error) => {
      console.error('서버 요청 오류:', error);
    });

    
  };

/*   const handleListPath = (board)=> {
    window.location.href =`http://localhost:3000/dasony/board/${board.boardCate.boardBigCate}/${board.boardCate.boardMiddleCate}/detail/${board.boardNo}`;
  } */

    

  return(
      <div className="board-admin-boardList dragging">
          <div className="mb-3 row">
              <div className="board-category-selectBoxList">
                  <div className="board-selectBox">
                      <span className='board-selectBox-cate-title'>대분류</span>
                      <span className="col-md-9 BoardList-head-title-text">
                                <select className='boardListSelect-admin' value={mainCateSelect.toString()} onChange={handleMainCateChange} >
                                <option style={{width: "30vh"}} className='boardListSelect-middleCate' value=''>게시판 선택</option>
                                {generalList.map((option, index) => (
                                    <option key={index} value={option.value}>{option.name}</option>
                                ))}
                                </select>
                            </span>
                      
                    </div>
                  
                  <div className="board-selectBox">
                        {/* <span  className='board-selectBox-cate-title'>소분류</span> */}
                        <span className="col-md-9 BoardList-head-title-text">
                    
                        {/* onChange={handlePathChange} */}
                      {/*   <select className='boardListSelect' value={cateItem} onChange={handleCateChange}>
                            <option value=''>카테고리 선택</option>
                            {listBoardCate.map((option, index) => (
                                <option key={index} value={option.value}>{option.name}</option>
                            ))}
                            </select> */}
                        </span>
                  </div>
              </div>
              {/* <input type='text' style={{width: "50%"}} ></input><button style={{width: "10%"}}>검색</button> */}
              <div className='board-admin-writer-wrapper' >
                <button className='board-admin-delete-btn' style={{width: "10%"}} onClick={handleDeleteList} >게시글 삭제</button>
              {/*   <button className='board-admin-writer-btn' style={{width: "10%"}} onClick={()=>navigate("/admin/board/new")}>공지등록</button> */}
              </div>
              
          </div>
           {/* * 이벤트 리스트에 필요한 것 : 이벤트 번호, 분류, 제목, 등록일, 남은일, 쪽지 발송 */}
     
          <table className="table" style={{ tableLayout: "fixed" ,fontSize: "1.5vh" ,textAlign: 'center'}}>
              <thead>
                  <tr>
                  <th scope="col" width="5%;">
                        <input type='checkbox'
                         value='selectall'
                         key={adminBList.boardNo}
                         checked={selectAllChecked} // 모두 선택 체크 상태 반영
                         onChange={selectAll} // 모두 선택 체크 상태 변경 핸들러 연결
                        />
                      </th>
                      <th scope="col" width="7%;">글번호</th>
                      <th scope="col" width="10%;">게시판</th>
                      <th scope="col" width="25%;">제목</th>
                      <th scope="col" width="15%;">작성자</th>
                      <th scope="col" width="15%;">등록일</th>
                      <th scope="col" width="7%;">상태</th>
                      {/* <th scope="col" width="8%;">안내</th> */}
                      {/* <th scope="col" width="8%;">삭제</th> */}
                  </tr>
              </thead>
        {
        adminBList.length > 0 && listBoardCate.length > 0 && adminBList
          .filter((board) => {
          return listBoardCate.some((category) => category.name === board?.boardCate.boardSmallCate);})
          .map( (board, index)=>(     
              <tbody key={index}>   
                    <tr className="notice-item">
                        <th scope="col" width="5%;">
                          <input type='checkbox' 
                          name='ckeck' 
                          defaultValue={board.boardNo}
                          onChange={handleCheckboxChange}
                          />
                        </th>
                        
                          <td scope="row">{board.boardNo}</td>
                          <td><div style={{ 
                                            border : 'none',
                                            width: '3vw',
                                            height : '2vh',
                                            borderRadius: '15%',
                                            color: 'white',
                                            backgroundColor:
                                            board.boardCate.boardSmallCate === '일상' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '맛집' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '게임' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '캐주얼' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '복지' ? 'lightgray' :
                                            board.boardCate.boardSmallCate === '날씨' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '혼밥' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '방송' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '포멀' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '교육' ? '#89ba88' :
                                            board.boardCate.boardSmallCate === '투표' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '혼술' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '취미' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '스트릿' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '대여' ? '#CB9DE7' :
                                            board.boardCate.boardSmallCate === '쇼츠' ? '#84abee' :
                                            board.boardCate.boardSmallCate === '분위기' ? '#84abee' :
                                            board.boardCate.boardSmallCate === '기타' ? '#84abee' :
                                            board.boardCate.boardSmallCate === '걸리시' ? '#84abee' :
                                            board.boardCate.boardSmallCate === '의료' ? '#84abee' : 'lightgray'}}>{board.boardCate.boardSmallCate}</div></td>
                          <td className="text-cut" /*  onClick={()=>handleListPath(board)} */>{board.boardTitle}</td>
                          <td scope="row">{board.user.userNick}</td>
                      
                        <td scope="row">{board.boardWriteDate}</td>
                        <td scope="row"style={{ border: '1px solid black', 
                                                borderLeft: 'none',
                                                borderRight: 'none',
                                                color: board.boardStatus === 'Y' ? 'green' : 'red' }}>
                          {board.boardStatus}
                        </td>
                    
                        {/* <td scope="row"><button>안내</button></td> */}
                        {/* <td scope="row"><button onClick={handleDeleteList} >삭제</button></td> */}
                    </tr>
              
              </tbody>
          ))}
              <tfoot>
              </tfoot>

          </table>   
         
        </div>
  );
};
export default AdminBoardList;