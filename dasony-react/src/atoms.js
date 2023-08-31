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
