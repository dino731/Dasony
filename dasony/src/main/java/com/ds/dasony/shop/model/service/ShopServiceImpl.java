package com.ds.dasony.shop.model.service;

import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.ds.dasony.shop.model.dao.ShopDao;
import com.ds.dasony.shop.model.vo.Product;
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

	@Override
	public Shop shopInfo(String shopOkey) {
		return shopDao.shopInfo(shopOkey);
	}

	@Override
	public int addProductImg(List<Map<String, Object>> uploadedFileName) {
		return shopDao.addProductImg(uploadedFileName);
	}

	@Override
	public int addProduct(Product product) {
		return shopDao.addProduct(product);
	}

	@Override
	public String findProductNo(Product product) {
		return shopDao.findProductNo(product);
	}

	@Override
	public List<Product> productInfo(String shopOkey, String shopCate) {
		return shopDao.productInfo(shopOkey, shopCate);
	}

	@Override
	public List<String> productInfoImg(String productNo) {
		return shopDao.productInfoImg(productNo);
	}

	@Override
	public int modProduct(Product product) {
		return shopDao.modProduct(product);
	}

	@Override
	public int deleteProductImg(String productNo) {
		return shopDao.deleteProductImg(productNo);
	}

	@Override
	public int productDelete(String productNo) {
		return shopDao.productDelete(productNo);
	}

	@Override
	public int productImgDelete(String productNo) {
		return shopDao.productImgDelete(productNo);
	}

	@Override
	public String shopTitle(String store) {
		return shopDao.shopTitle(store);
	}

}
