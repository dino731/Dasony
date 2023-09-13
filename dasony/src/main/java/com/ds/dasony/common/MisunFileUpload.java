package com.ds.dasony.common;

import java.io.File;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import com.ds.dasony.shop.model.vo.Product;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class MisunFileUpload {
	
	static String absolutePath = new File("").getAbsolutePath() + "\\";
	private final static String filePath = "src/main/webapp/resources/images/";
	
	public static List<Map<String, Object>> mulitiFileUpload(
				HttpServletRequest request,
				String fkNum,
				String path
			) throws IllegalStateException, IOException {
			MultipartHttpServletRequest multiRequest = (MultipartHttpServletRequest)request;
			
			List<Map<String, Object>> list = new ArrayList<>();
			List<MultipartFile> fileMap = multiRequest.getFiles("file");
			for(MultipartFile multipartFile : fileMap) {
				if(!multipartFile.isEmpty()) {
					//원래 파일명
					String originName = multipartFile.getOriginalFilename();

					//변경된 파일이름 구하기
					String changeName = getChangeName(originName);

					//업로드할 경로 설정하기
					String thisPath = filePath + path + "/"; 
					
					//파일 폴더 유무 구분 및 생성
					File dir = new File(thisPath);
			        if (!dir.exists()) {
			            dir.mkdirs();
			        }
			        log.info(absolutePath + thisPath);

					//파일 업로드 처리
			        multipartFile.transferTo(new File(absolutePath + thisPath + changeName));

					//업로드된 파일 정보 저장
					//[1] Map에 저장
					Map<String, Object> resultMap = new HashMap<>();
					resultMap.put("productImgModName", changeName);
					resultMap.put("productImgOriName", originName);
					resultMap.put("productImgPath", thisPath);
					resultMap.put("productImgLevel", "1");
					resultMap.put("productNo", fkNum);

					//[2] 여러 개의 Map을 List에 저장
					list.add(resultMap);
				}
			}

			return list;
	}
	
	
	private static String extractExt(String originName) {
		int cutPoint = originName.lastIndexOf(".");
		return originName.substring(cutPoint + 1);
	}
	
	private static String getChangeName(String originName) {
		SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyyMMddHHmmss");
		String changeName = simpleDateFormat.format(new Date()) + ((int)(Math.random() * 50)+1) + "." +  extractExt(originName);
		return changeName;
	}

}
