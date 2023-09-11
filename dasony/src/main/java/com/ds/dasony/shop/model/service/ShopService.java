package com.ds.dasony.shop.model.service;

import java.util.List;
import java.util.Map;

import com.ds.dasony.shop.model.vo.Shop;

public interface ShopService {

	public List<Shop> shopList(String userRegion);

	public int shopDelete(Map<String, String> shopOkey);

	public int shopAdd(Shop shop);

	public int modifyingShop(Shop modifyingShop);

}