import './Board.css';
import { useEffect, useState } from 'react';
import { boardPostState } from '../atoms';
import { useLocation, useNavigate } from 'react-router-dom';
import { boardCateState } from '../atoms';
import { useRecoilState } from 'recoil';

const BoardWriterCategory = () =>{
  const location = useLocation();
  const path = location.pathname;
  const [boardCateItem, setBoardCateItem] = useState('');
   // Recoil 상태 가져오기
   const [boardCateStateValue, setBoardCateState] = useRecoilState(boardCateState);
  
  // Category 토글에 사용됨
  const BoardDetailcategory = [
    { name: '일상', value: 'AD01' },
    { name: '날씨', value: 'AD04' },
  ];
  const BoardVotecategory = (
    { name: '쇼츠', value: 'AD02' }
  );
  const BoardShortscategory = (
    { name: '투표', value: 'AD03' }
  );
  const BoardInterestCategory = [
    { name: '게임', value: 'AI01' },
    { name: '방송', value: 'AI02' },
    { name: '취미', value: 'AI03' },
    { name: '기타', value: 'AI04' },
  ];
  const BoardJMTCategory = [
    { name: '맛집', value: 'BJ01' },
    { name: '혼밥', value: 'BJ02' },
    { name: '혼술', value: 'BJ03' },
    { name: '분위기', value: 'BJ04' },
  ];
  const BoardFashionCategory = [
    { name: '캐주얼', value: 'BF01' },
    { name: '포멀', value: 'BF02' },
    { name: '스트릿', value: 'BF03' },
    { name: '걸리시', value: 'BF04' },
  ];
  const BoardLocalCategory = [
    { name: '복지', value: 'BL01' },
    { name: '교육', value: 'BL02' },
    { name: '대여', value: 'BL03' },
    { name: '의료', value: 'BL04' },
  ];

  // useEffect(() => {
  //   // 초기화 시점에 전역 상태 초기값으로 업데이트
  //   setBoardCateState(boardCateItem);
  // }, [boardCateItem]);

  const handleBoardDCate = (e) =>{
    const selectedValue = e.target.value;
    const selectedCategory = boardCate.find(cat => cat.value === selectedValue);
    console.log('보드카테 :',selectedValue);
    console.log('보드카테 :',selectedCategory);
    console.log('보드카테 :',boardCateState);
    setBoardCateItem(selectedValue);
    setBoardCateState(selectedCategory); // 전역 상태 업데이트
    console.log('selectedCategory:====', selectedCategory);
  };
  const dailypath = new RegExp("daily/dwriter");

  const dailyOptions = path.match(dailypath) ? path : null;
  const shortsOptions = path.includes('swriter')? path : null;
  const voteOptions = path.includes('vwriter')? path : null;
  const interestOptions = path.includes('interest')? path : null;
  const jmtOptions = path.includes('jmt')? path : null;
  const fashionOptions = path.includes('fashion')? path : null;
  // console.log(dailyOptions);

  // console.log(jmtOptions);
  // console.log(path);

  const [boardCate, setBoardCate] = useState([]);
  useEffect(() => {
    if (path == dailyOptions) {
      setBoardCate(BoardDetailcategory);
      console.log('보드카테 dailyOP',setBoardCate);
    } else if (path == shortsOptions) {
      setBoardCate(BoardVotecategory);
    } else if (path == voteOptions) {
      setBoardCate(BoardShortscategory);
    } else if (path == interestOptions) {
      setBoardCate(BoardInterestCategory);
    } else if (path == jmtOptions) {
      setBoardCate(BoardJMTCategory);
    } else if (path == fashionOptions) {
      setBoardCate(BoardFashionCategory);
    } else {
      setBoardCate(BoardLocalCategory);
      console.log('보드카테else:',setBoardCate);
    }
  }, []);

 return(
  <div className="col-md-2 boardDetail-category-div">
    <select id="boardDetail-category" onChange={handleBoardDCate} value={boardCateItem}>
      {boardCate.map((option, index) => (
        <option onClick={(e)=>{setBoardCateItem(e.target.value);}} value={option.value} key={index}>
          {option.name}
        </option>
      ))}
    </select>
  </div>
 )
}
export default BoardWriterCategory;