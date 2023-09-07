package com.ds.dasony.alert.model.service;

import java.util.ArrayList;
import java.util.List;


import com.ds.dasony.alert.model.vo.Alert;

public interface AlertService {

	public List<Alert> getAlertList(int userNo);


}
