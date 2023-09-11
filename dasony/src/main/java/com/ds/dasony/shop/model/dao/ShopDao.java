package com.ds.dasony.shop.model.dao;

import java.util.List;
import java.util.Map;

import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;
import org.springframework.web.bind.annotation.PostMapping;

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

}
