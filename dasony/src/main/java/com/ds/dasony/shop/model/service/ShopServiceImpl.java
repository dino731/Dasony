package com.ds.dasony.shop.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.shop.model.dao.ShopDao;
import com.ds.dasony.shop.model.vo.Shop;

@Service
public class ShopServiceImpl implements ShopService{

	private final ShopDao shopDao;
	@Autowired
	public ShopServiceImpl(ShopDao shopDao) {
		this.shopDao = shopDao;
	}
	
	@Override
	public List<Shop> shopList(String userRegion) {
		return shopDao.shopList(userRegion);
	}

	@Override
	public int shopDelete(Map<String, String> shopOkey) {
		return shopDao.shopDelete(shopOkey);
	}

	@Override
	public int shopAdd(Shop newShop) {
		return shopDao.shopAdd(newShop);
	}

	@Override
	public int modifyingShop(Shop modifyingShop) {
		return shopDao.modifyingShop(modifyingShop);
	}

}
