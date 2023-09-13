package com.ds.dasony.shop.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

import com.ds.dasony.shop.model.vo.Product;
import com.ds.dasony.shop.model.vo.Shop;

@Repository
public class ShopDao {
	private final SqlSessionTemplate session;
	
	@Autowired
	public ShopDao(SqlSessionTemplate session) {
		this.session = session;
	}

	public List<Shop> shopList(String userRegion) {
		return session.selectList("shopMapper.shopList", userRegion);
	}

	public int shopDelete(Map<String, String> shopOkey) {
		return session.delete("shopMapper.shopDelete", shopOkey);
	}

	public int shopAdd(Shop newShop) {
		return session.insert("shopMapper.shopAdd", newShop);
	}

	public int modifyingShop(Shop modifyingShop) {
		return session.update("shopMapper.modifyingShop", modifyingShop);
	}

	public Shop shopInfo(String shopOkey) {
		return session.selectOne("shopMapper.shopInfo", shopOkey);
	}

	public int addProductImg(List<Map<String, Object>> uploadedFileName) {
		return session.insert("shopMapper.addProductImg", uploadedFileName);
	}

	public int addProduct(Product product) {
		return session.insert("shopMapper.addProduct", product);
	}

	public String findProductNo(Product product) {
		return session.selectOne("shopMapper.findProductNo", product);
	}

	public List<Product> productInfo(String shopOkey) {
		return session.selectList("shopMapper.productInfo", shopOkey);
	}

	public List<String> productInfoImg(String productNo) {
		return session.selectList("shopMapper.productInfoImg", productNo);
	}

	public int modProduct(Product product) {
		return session.update("shopMapper.modProduct", product);
	}

	public int deleteProductImg(String productNo) {
		return session.update("shopMapper.deleteProductImg", productNo);
	}

}
