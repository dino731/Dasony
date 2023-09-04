import { atom } from 'recoil';

// board 게시글 등록 state
export const boardPostState = atom({
  key: 'boardPostState',
  default: [],
});

// boardNo 임시 자동 생성기
export const nextBoardNoState  = atom({
  key: 'nextBoardNoState ',
  default: 1,
});

export const boardCateState = atom({
  key: 'boardCateState',
  default:[],
});

 // Category 토글에 사용됨
export const BoardDetailcategoryState = atom({
  key : 'BoardDetailcategory',
  default :
  [
    { name: '일상', value: 'AD01' },
    { name: '날씨', value: 'AD04' },
  ],
})

export const BoardVotecategoryState = atom({
  key : 'BoardVotecategory',
  default :
  ({ name: '투표', value: 'AD03' }),
})

export const BoardShortscategoryState = atom({
  key : 'BoardVotecategory',
  default :
  ( { name: '쇼츠', value: 'AD02' }),
})

export const BoardInterestCategoryState = atom({
  key : 'BoardInterestCategory',
  default :
  [
    { name: '게임', value: 'AI01' },
    { name: '방송', value: 'AI02' },
    { name: '취미', value: 'AI03' },
    { name: '기타', value: 'AI04' },
  ],
}) 

export const BoardJMTCategoryState = atom({
  key : 'BoardJMTCategory',
  default :
  [
    { name: '맛집', value: 'BJ01' },
    { name: '혼밥', value: 'BJ02' },
    { name: '혼술', value: 'BJ03' },
    { name: '분위기', value: 'BJ04' },
  ],
})
export const BoardFashionCategoryState = atom({
  key : 'BoardFashionCategory',
  default : 
  [
    { name: '캐주얼', value: 'BF01' },
    { name: '포멀', value: 'BF02' },
    { name: '스트릿', value: 'BF03' },
    { name: '걸리시', value: 'BF04' },
  ],
}) 
export const BoardLocalCategoryState = atom({
  key : 'BoardLocalCategory',
  default :
  [
    { name: '복지', value: 'BL01' },
    { name: '교육', value: 'BL02' },
    { name: '대여', value: 'BL03' },
    { name: '의료', value: 'BL04' },
  ],
}) 
