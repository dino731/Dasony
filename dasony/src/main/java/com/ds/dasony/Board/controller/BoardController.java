package com.ds.dasony.Board.controller;


import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ds.dasony.Board.model.service.BoardService;
import com.ds.dasony.Board.model.vo.Board;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.common.Utils;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/board") // 공통주소
// 현재 컨트롤러 호출시 /spring/board의 경로로 들어오는 모든 url요청을 받아준다.
//@SessionAttributes({ "loginUser" })
public class BoardController {
	
	
	private final BoardService boardService;
	
	@Autowired
	public BoardController (BoardService boardService) {
		this.boardService = boardService;
	}
	
	@Autowired
	private ServletContext application;
	
//	 @Value("${part.upload.path}")
//	 private String uploadPath;
	
	
	@GetMapping("/general/daily")
	public List<BoardExt> boardDailyList() {
//		User user = (User) session.getAttribute("user");
		List<BoardExt> bListMap = null; // 초기화
//		if(user != null) {
//			Long userNo = user.getUserNo();
//		 	Long userNo = (long) 23090755;
			bListMap = boardService.boardDailyList(); // 게시글 목록 가져오기
			log.info("bListMap = {}", bListMap);
//		}
		return bListMap;
	}
//	@PostMapping("/general/daily/dwriter/{boardCateNo}")
//	public String insertBoard(List<MultipartFile> upfiles
//								, BoardExt b, @PathVariable("boardCateNo")int boardCateNo , HttpSession session
//								) {
//		
//		String webPath = "/resources/images/board/";
//		String severFolderPath = application.getRealPath(webPath);
//		
//		b.setUserNo(23090755);
//		b.setBoardCateNo(boardCateNo);
//		
//		// 디렉토리생성 , 해당디렉토리가 존재하지 않는다면 생성
//		File dir = new File(severFolderPath);
//		if (!dir.exists()) {
//			dir.mkdirs();
//		}
		// 첨부파일같은 경우 선택하고 안하고 상관없이 객체는 생성이 된다 단, 길이가 0일수가 있음.
		// 전달된 파일이 있는경우 해당파일을 웹서버에 저장하고, Attachment테이블에 해당정보를 등록.
		// 없는경우 위프로세스를 패스할것.
		
//		List<Board> boardList = new ArrayList();
//		int level = -1;
//		for (MultipartFile upfile : upfiles) {
			// input[name=upFile]로 만들어두면 비어있는 file이 넘어올수 있음.
//			level++;
//			if (upfile.isEmpty())
//				continue;

			// 1. 파일명 재정의 해주는 함수.
//			String boardImgModName = Utils.saveFile(upfile, severFolderPath);
//			Board at = Board.
//						builder().
//						boardImgModName(boardImgModName).
//						boardImgOriName(upfile.getOriginalFilename()).
//						boardImgLevel(level).build();
//						// DB에서 boardImgLevel number자료형으로 바꾸기 2023.09.08 ain
//			boardList.add(at);
//		}
//		int result = 0;
//
//		try {
//			result = boardService.insertBoard(b, boardList, severFolderPath, webPath);
//		} catch (Exception e) {
//			log.error("error = {}", e.getMessage());
//			// e.printStackTrace();
//		}
//
//		if (result > 0) {
//			session.setAttribute("alertMsg", "게시글 작성에 성공하셨습니다.");
//			return "/board/general/daily";
//		} else {
//			session.setAttribute("alertMsg", "게시글 작성 실패");
//			return "/board/general/daily";
//		}
//		
		
//	}

	
	
	
	
	
}
