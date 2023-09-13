package com.ds.dasony.shop.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;

import com.ds.dasony.common.MisunFileUpload;
import com.ds.dasony.shop.model.service.ShopService;
import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.Shop;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin")
public class AdminShopController {

	private final ShopService shopService;
	@Autowired
	public AdminShopController(ShopService shopService) {
		this.shopService = shopService;
	}
	
	@PostMapping("/shopInfo")
	public ResponseEntity<Shop> shopInfo (@RequestBody Map<String, String>map){
		String shopOkey = map.get("shopOkey");
		Shop shop = shopService.shopInfo(shopOkey);
		log.info("shopOkey={}============>>>",shopOkey);
		log.info("shop={}============>>>",shop);
		
		return ResponseEntity.ok(shop);
	}
	
	@PostMapping("/addProduct")
	public String addProduct(
			HttpServletRequest httpServletRequest,
            @RequestPart(value = "product") Product product) {
		log.info("product: {}=================>>>>>>>>>>///////////", product);
		// 파일 업로드 처리
	    List<Map<String, Object>> uploadedFileName = new ArrayList<>();
	    try {
	    	int productResult = shopService.addProduct(product);
    		String productNo = shopService.findProductNo(product);
    		log.info("productNo: {}=================>>>>>>>>>>///////////", productNo);
	        uploadedFileName = MisunFileUpload.mulitiFileUpload(httpServletRequest, productNo, "product");
	    } catch (IOException e) {
	        // 파일 업로드 오류 처리
	        e.printStackTrace();
	        return "File upload failed";
	    }
	    log.info("uploadedFileName: {}=================>>>>>>>>>>///////////", uploadedFileName);
	    // 상품 정보 업로드 성공한 경우, 상품 이미지 업데이트
	    if (uploadedFileName != null && !uploadedFileName.isEmpty()) {
	    	try {
	    		int imgResult = shopService.addProductImg(uploadedFileName);
	    		return "Product added successfully";
	    	} catch (Exception ex) {
	    		ex.printStackTrace();
	    		return "Failed to add product. Please try again.";
	    	}
	        
	    } else {
	        return "File upload failed"; // 파일 업로드 실패 시 반환하는 메시지
	    }
	}
	
	@PostMapping("/productInfo")
	public ResponseEntity<Object> productInfo(@RequestBody Map<String, String>map){
		String shopOkey = map.get("shopOkey");
		List<Product> product = new ArrayList();
		product = shopService.productInfo(shopOkey);
		List<String> productImg = new ArrayList();
		Map<String, Object> productMap = new HashMap();
		
		for(int i = 0; i<product.size();i++) {
			String productNo = product.get(i).getProductNo();
			productImg = shopService.productInfoImg(productNo);
			
			
			List<String> productPath = new ArrayList();
			for(int j = 0; j<productImg.size(); j++) {
				log.info(productImg.get(j));
				productPath.add("http://localhost:8083/dasony/resources/images/product/"+productImg.get(j));
			}
			product.get(i).setProductImg(productPath);
			productMap.put("product", product);
			
		}
		log.info("product={},==>>>>>>>>>>", product);
			return ResponseEntity.ok(productMap);
	}
}
