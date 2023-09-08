package com.ds.dasony.Board.model.vo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@AllArgsConstructor // 모든 생성자...
@NoArgsConstructor 	// 생성자 없어도 쓸수있게 자동 생성
@Data
public class BoardVideo {
	private int videoNo;	//VIDEO_NO
	private String videoModName;	//VIDEO_MOD_NAME
	private String videoOriName;	//VIDEO_ORI_NAME
	private String videoPath;	//VIDEO_PATH
	private String videoUploadDate;	//VIDEO_UPLOAD_DATE

}
