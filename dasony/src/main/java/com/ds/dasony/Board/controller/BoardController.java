package com.ds.dasony.Board.controller;


import java.io.File;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.ds.dasony.Board.model.service.BoardService;
import com.ds.dasony.Board.model.vo.BoardCare;
import com.ds.dasony.Board.model.vo.BoardDetailExt;
import com.ds.dasony.Board.model.vo.BoardExt;
import com.ds.dasony.Board.model.vo.BoardImg;
import com.ds.dasony.Board.model.vo.BoardTag;
import com.ds.dasony.Board.model.vo.BoardWriterForm;
import com.ds.dasony.Board.model.vo.Reply;
import com.ds.dasony.common.BoardUtils;

import lombok.Delegate;
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
	
	
	@GetMapping(value = {"/general/daily","/general/interest","/info/jmt","/info/fashion","/info/local"})
	public List<BoardExt> boardDailyList(@RequestParam(name = "userRegion",required = false)String userRegion) {
		
		List<BoardExt> bListMap = null; // 초기화

		bListMap = boardService.boardDailyList(userRegion); // 게시글 목록 가져오기
		log.info("bListMap = {}", bListMap);

		return bListMap;
	}

	@PostMapping(value = {"/general/daily/dwriter","/general/interest/dwriter","/info/jmt/dwriter","/info/fashion/dwriter","/info/local/dwriter"})	    
	public String insertBoard(HttpServletRequest request,
								BoardWriterForm boardWriterForm,
								 @RequestParam("file") List<MultipartFile> boardImgFiles,
								 @RequestParam("boardWriteDate") String boardWriteDate,
								 @RequestParam("boardTag")String boardTag
					         ) {

	        String webPath = "/resources/images/board/";
	        String severFolderPath = application.getRealPath(webPath);
	        
	        log.info("severFolderPath = {} ", severFolderPath);
	        
	        // 디렉토리 생성
			File dir = new File(severFolderPath);
			if (!dir.exists()) {
				dir.mkdirs();
			}

	        List<BoardImg> bImg = new ArrayList<BoardImg>();
	        BoardTag bt = new BoardTag();
	        bt.setBoardTag(boardTag.replace("\"", ""));
	        
	        int level = 0;
	        for (MultipartFile file : boardImgFiles) {
	    	   level++;
	            if (file.isEmpty())
	                continue;

	            String boardImgModName = BoardUtils.saveFile(file, severFolderPath);
	            BoardImg bi = BoardImg.
	            			  builder().
	            			  boardImgModName(boardImgModName).
	            			  boardImgOriName(file.getOriginalFilename()).
	            			  boardImgLevel(level).
	            			  boardImgUploadDate(boardWriterForm.getBoardWriteDate()).
	            			  userNoRef(boardWriterForm.getUserNo()).
	            			  boardImgStatus("Y").
	            			  boardImgPath(webPath).build();
	            bImg.add(bi);

	            log.info("Uploaded file name = {}", file.getOriginalFilename());
		        log.info("boardWriterForm = {}",boardWriterForm);
		        log.info("bImg = {}",bImg);
		        log.info("bt = {}",bt);
		     
//	            log.info("Content type: {}", file.getContentType());
//	            log.info("File size: {}", file.getSize());
//	            log.info("boardWriteDate: {}", boardWriteDate);
	        }
	        int result = 0;
	        String m = "";
	        try {
	        	result = boardService.insertBoard(boardWriterForm, bImg, bt, severFolderPath);
	        } catch (Exception e) {
	            log.error("error = {}", e.getMessage());
	        }
	        if (result > 0) {
	            log.info("게시글 등록 성공",result);
	            return m ="게시글 등록 성공";
	        } else {
	        	log.info("게시글 등록 실패",result);
	            return m ="게시글 등록 실패";
			}

	}
	@GetMapping("/boardViewsCount")
	public String boardViewsCount(@RequestParam("boardNo") int boardNo) {
		int count = boardService.insertBordViews(boardNo);	
		String m = "";
		if(count >0) {
			m = "조회수 업데이트 성공";
			log.info("views count 성공 = {}",count);
		}else {
			log.info("views count 실패 = {}",count);
			m = "조회수 업데이트 실패";
		}
		return m;
	}
	@GetMapping(value = {"/general/daily/detail/{boardNo}","/general/interest/detail/{boardNo}","/info/jmt/detail/{boardNo}","/info/fashion/detail/{boardNo}","/info/local/detail/{boardNo}"})	    
	public List<BoardDetailExt> boardDetail(@PathVariable("boardNo") int boardNo) {
		List<BoardDetailExt> bDetailListMap = null; // 초기화
				
		bDetailListMap = boardService.boardDetail(boardNo); // 게시글 목록 가져오기
		 // rUserNo 값을 저장할 리스트
	    List<Reply> rUserNoList = new ArrayList<Reply>();
	    
	    // 각 BoardDetailExt 객체에서 rUserNo 값을 추출하여 리스트에 저장
	    if (bDetailListMap != null && !bDetailListMap.isEmpty()) {
	        for (BoardDetailExt boardDetailExt : bDetailListMap) {
	            if (boardDetailExt != null && boardDetailExt.getReplyList() != null && !boardDetailExt.getReplyList().isEmpty()) {
	                Reply replyList = boardDetailExt.getReplyList().get(0); // 예를 들어, 첫 번째 댓글을 가져오도록 했습니다.
	                int rUserNo = replyList.getRUserNo();
	                int replyNo = replyList.getReplyNo();
	                String replyContent = replyList.getReplyContent();
	                String replyStatus = replyList.getReplyStatus();
	                String replyWriteDate = replyList.getReplyWriteDate();

	                Reply r = Reply
	                		.builder()
	                		.replyNo(replyNo)
	                		.rBoardNo(boardNo)
	                		.replyContent(replyContent)
	                		.replyStatus(replyStatus)
	                		.replyWriteDate(replyWriteDate)
	                		.rUserNo(rUserNo)	                		
	                		.build();
	                rUserNoList.add(r);	                
	            }
	        }
	    }
	    log.info("맵 확인.{}",bDetailListMap);
		return bDetailListMap;
		
	}
	@GetMapping(value = {"/general/daily/edit/{boardNo}","/general/interest/edit/{boarNo}","/info/jmt/edit/{boarNo}","/info/fashion/edit/{boarNo}","/info/local/edit/{boarNo}"})	    
	public BoardWriterForm boardEditList(@PathVariable int boardNo) {
		BoardWriterForm bEditListMap = null; // 초기화

		bEditListMap = boardService.boardEdit(boardNo); // 게시글 목록 가져오기
		log.info("boardDetail bEditListMap = {}", bEditListMap);

		return bEditListMap;
		
	}
	@PostMapping(value = {"/reply"})	    
	public String insertReply(HttpServletRequest request, 
								Reply reply, 
								@RequestParam("boardNo")int boardNo, 
								@RequestParam("userNo")int userNo
								) {

		Reply r = Reply.
				  builder().
				  replyContent(reply.getReplyContent()).
				  replyWriteDate(reply.getReplyWriteDate()).
				  replyStatus("Y").
				  rBoardNo(boardNo).
				  rUserNo(userNo)
				  .build();
		log.info(" insertReply r",r.toString());

				
		int result = 0;
		String m = "";
		result = boardService.insertReply(r,userNo); // 게시글 목록 가져오기
		log.info("insertReply r = {}", r);
		if(result > 0) {
			log.info("답글 등록 성공 = {}",result);
			return m = "답글 등록 성공";
		}else {
			log.info("답글 등록 실패 = {}",result);
			return m = "답글 등록 실패";
		}
		
	}
	@GetMapping("/serchHeart")
	public String serchHeart(@RequestParam("boardNo") int boardNo, @RequestParam("userNo") int userNo) {
		BoardCare bc = BoardCare.builder().bCareBoardNo(boardNo).bCareUserNo(userNo).build();
		int result = 0;
		result = boardService.serchHeart(bc);
		String m = "";
		if(result > 0) {
			m = "true";
		}else {
			m = "";
		}
		return m; 
	}
	
	@PostMapping("/insertHeart")
	public String insertHeart(@RequestParam("boardNo") int boardNo, @RequestParam("userNo") int userNo) {
		BoardCare bc = BoardCare.builder().bCareBoardNo(boardNo).bCareUserNo(userNo).build();
		int result = 0;
		String m = "";
		result = boardService.insertHeart(bc);
		if(result >0) {
			log.info("좋아요 등록 성공 = {}",result);
			return m = "좋아요 등록 성공";
		}else {
			log.info("좋아요 등록 실패 = {}",result);
			return m = "좋아요 등록 실패";
		}
		
	}
	
	@DeleteMapping("/deleteHeart")
	public String deleteHeart(@RequestParam("boardNo") int boardNo, @RequestParam("userNo") int userNo) {
		
		BoardCare bc = BoardCare.builder().bCareBoardNo(boardNo).bCareUserNo(userNo).build();
		int result = 0;
		String m = "";
		result = boardService.deleteHeart(bc);
		if(result >0) {
			log.info("좋아요 등록 성공 = {}",result);
			return m = "좋아요 삭제 성공";
		}else {
			log.info("답글 등록 실패 = {}",result);
			return m = "좋아요 등록 실패";
		}
		
	}
	
	
	
	
	
	
}
	
	

