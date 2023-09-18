package com.ds.dasony.Board.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.Board.model.vo.Board;

public interface BoardShService {

	int addBoardSh(Board board);

	int findBoardNo(Board board);

	int addBoardVedio(List<Map<String, Object>> uploadedFileName);

}
